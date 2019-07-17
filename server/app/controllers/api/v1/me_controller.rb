# 認証済みユーザーが自分自身の情報を取得するためのAPIを提供する
class Api::V1::MeController < ApplicationController
  before_action :authenticated?

  # GET /api/v1/me/follows
  def follows
    follows = Follow.get_own_follows(@current_user.id).as_json(include: [:project, :user])
    render json: {follows: follows}
  end

  # GET /api/v1/me/backers
  def backers
    backers = Backer.preload(user: {}, plan: [:project]).where(user_id: @current_user.id)
    backers = backers.as_json(except: [], include: {user: {}, plan: {include: [:project]}})
    render json: {backers: backers}
  end


  # GET /api/v1/me/associated-accounts
  def associated_accounts
    accounts = AssociatedAccount.where(user_id: @current_user.id)
    render json: {accounts: accounts}
  end

  # POST /api/v1/me/request-mail-change
  def request_mail_change
    req = MailChangeRequest.create_request(@current_user.id, params[:email])
    AuthenticationMailer.mail_change(req.email, req.token).deliver_later
    render json: {
      code: 0,
    }
  end

  # GET /api/v1/me/notifications
  def notifications
    notifications = Notification.get_notifications(@current_user.id)
    render json: {notifications: notifications}
  end

  # GET /api/v1/me/notifications/unread-count
  def notifications_unread_count
    count = Notification.unread_count(@current_user.id)
    render json: {count: count}
  end

  # POST /api/v1/me/notifications/read-all
  def read_all_notifications
    Notification.read_all(@current_user.id)
    render_ok
  end

  # GET /api/v1/me/notification-setting
  def notification_setting
    setting = NotificationSetting.find_or_create_by!(user_id: @current_user.id)
    render json: {setting: setting}
  end

  def update_notification_setting
    setting = NotificationSetting.find_by(user_id: @current_user.id)
    setting.update!(params.fetch(:setting, {}).permit(%i[
                                                        new_post_mail
                                                        new_post_web
                                                        new_comment_mail
                                                        new_comment_web
                                                        new_member_mail
                                                        new_member_web
                                                        new_follow_mail
                                                        new_follow_web
                                                        new_backer_mail
                                                        new_backer_web
                                                        back_number_sold_mail
                                                        back_number_sold_web
                                                      ]))
    render json: {setting: setting}
  end

  # PUT /api/v1/me/name
  def update_name
    @current_user.name = params[:name]
    @current_user.save!

    render_ok
  end

  # PUT /api/v1/me/password
  def update_password
    auth = UserAuthentication.find_by(user_id: @current_user.id)
    if auth.present?
      auth.update_password(params[:password])
    else
      salt = UserAuthentication.make_salt
      digest = UserAuthentication.make_digest(salt, params[:password])
      UserAuthentication.create!(
        user_id: @current_user.id,
        password_salt: salt,
        password_digest: digest
      )
    end

    render_ok
  end
end
