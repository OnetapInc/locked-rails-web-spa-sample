class AuthenticationMailer < ApplicationMailer

  # 登録時のメール確認
  def signup_confirmation(email, token)
    @host = web_host
    @email = email
    @token = token
    @subject = "#{@subject_prefix}登録を承認してください。"

    mail(to: @email, subject: @subject)
  end

  # メールアドレス変更
  def mail_change(email, token)
    @host = web_host
    @email = email
    @token = token
    @subject = "#{@subject_prefix}メールアドレスの変更を承認してください。"

    mail(to: @email, subject: @subject)
  end

  # パスワードリセット
  def password_reset(email, token)
    @host = web_host
    @subject = "#{@subject_prefix}パスワードリセットの確認"
    @token = token
    mail(to: email, subject: @subject)
  end
end
