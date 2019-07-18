class Api::V1::AuthController < ApplicationController
  before_action :authenticated?, only: [:verify, :update, :update_profile_image]
  before_action :set_user, only: [:show, :update, :update_profile_image]

  # POST /api/v1/auth/sign_up
  def sign_up
    user = User.find_by(email: params[:email], status: User::STATUS_NORMAL)
    if user.present?
      return render_failed({message: 'This email is already registered', code: 1})
    end
    req = SignUpRequest.create_for_sign_up(params[:email], params[:password])

    unless Rails.env.test?
      AuthenticationMailer.signup_confirmation(req.email, req.token).deliver_later
    end

    render_ok
  rescue => e
    logger.error(e)
    render_failed
  end

  # GET /api/v1/auth/sign-up-confirm
  def sign_up_confirm
    result = SignUpRequest.confirm_sign_up(params[:token])
    return render_failed if result.blank?

    # フロント側でトークンをローカルストレージに保存する
    render json: {
      access_token: result[:access_token].token
    }
  end

  # POST /api/v1/auth/login
  def login
    email = params[:email].strip
    password = params[:password].strip
    result = User.login(email, password)
    user = result[:user]
    if result.present?
      begin
       result = locked.authenticate(
         event: '$login.attempt',
         user_id: "user#{user.id}",
         user_ip: request.remote_ip,
         user_agent: request.user_agent,
         email: user.email,
         callback_url: 'http://localhost:4000/load' # optional, but recommended
       )
      rescue Locked::Error => e
       puts e.message
      end

      case result[:data][:action]
      when 'allow'
        MailLoginLog.success(email)
        return render json: {access_token: result[:token]}
      when 'verify'
          user.update!(
            locked_token: result[:data][:verify_token],
            locked_token_expired_at: Time.zone.now + 1.hour
          )
          return render json: {verify_token: result[:data][:verify_token]}
      when 'deny'
        return render json: {code: 'E01004'}, status: 400
      end

    else
      MailLoginLog.failed(email)
      return render json: {code: 'E01004'}, status: 400
    end
  end

  def load
    user = User.where('locked_token_expired_at > ?', Time.zone.now).find_by(locked_token: params[:token])
    if user
      MailLoginLog.success(user.email)
      access_token = AccessToken.create(user.id)
      return render json: {access_token: access_token}, status: 200
    else
      return render json: {code: 'E01004'}, status: 400
    end
  end

  # GET /api/v1/auth/verify
  def verify
    render json: {
      user: @current_user.as_json(all: true),
    }
  end


  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.fetch(:user, {})
  end
end
