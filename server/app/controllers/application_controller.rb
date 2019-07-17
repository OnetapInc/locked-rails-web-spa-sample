class ApplicationController < ActionController::API

  rescue_from Exception, with: :render_500
  rescue_from ActiveRecord::RecordInvalid, with: :render_400

  before_action :set_current_user

  def render_400(exception = nil)
    Rails.logger.warn('Status 400:' + exception.message) if exception.present?
    # Rails.logger.warn(exception.backtrace.join("\n")) if exception.present?
    case exception
    when ActiveRecord::RecordInvalid
      render json: {message: 'Bad Request: found invalid input'}, status: 400
    else
      render json: {message: 'Bad Request'}, status: 400
    end
  end

  def render_403(exception = nil)
    render json: {message: 'Not Permitted'}, status: 403
  end

  def render_404(exception = nil)
    render json: {message: 'Resource Not Found'}, status: 404
  end

  def render_500(exception = nil)
    if exception
      raise exception if Rails.env.test?

      Rails.logger.error exception
      Rails.logger.error exception.backtrace.slice(0, 10).join("\n")
      ErrorHandlingService.notify(exception)
    end
    render json: {message: 'Error 500'}, status: 500
  end

  # @current_user変数を設定する
  def set_current_user
    @current_user = nil
    token = request.headers[:HTTP_X_SATO_TOKEN]
    access_token = AccessToken.where(token: token).first
    if access_token.present?
      user = access_token.user
      @current_user = access_token.user if user.status == User::STATUS_NORMAL
    end
  end

  # 認証済みユーザーであるかチェックする
  def authenticated?
    if @current_user.nil?
      params = {message: 'You are not authenticated.'}
      render_failed(params, 403)
    end
  end

  def render_ok(msg = 'success', status = 200)
    h = if msg.is_a?(Hash)
          msg
        else
          {message: msg}
        end
    render :json => h, status: status
  end

  def render_failed(msg = 'error', status = 400)
    h = if msg.is_a?(Hash)
          msg
        else
          {message: msg}
        end
    render :json => h, status: status
  end
end
