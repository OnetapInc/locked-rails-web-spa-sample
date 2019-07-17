class SignUpRequest < ApplicationRecord

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: {with: VALID_EMAIL_REGEX}

  validates :token, presence: true

  # @param [String] email メールアドレス
  # @param [String] password パスワード
  # @return [SignUpRequest]
  def self.create_for_sign_up(email, password)
    raise 'email must be set' if email.blank?
    raise 'password must be set' if password.blank?

    salt = UserAuthentication.make_salt
    req = SignUpRequest.new
    req.email = email
    req.password_salt = salt
    req.password_digest = UserAuthentication.make_digest(salt, password)
    req.token = SecureRandom.uuid
    req.expired_at = DateTime.now + 1.days
    req.save!
    req
  end

  # トークンの検証を行い、正しければ認証情報を作成する
  # @param [String] token トークン
  def self.confirm_sign_up(token)
    ActiveRecord::Base.transaction do
      req = SignUpRequest.find_by('token = ? AND expired_at > ?', token, DateTime.now)
      return nil if req.blank?

      user = User.create_for_sign_up(req.email)
      auth = UserAuthentication.create_for_sign_up(user.id, req.password_salt, req.password_digest)

      access_token = AccessToken.create(user.id)
      req.delete

      {
        authentication: auth,
        access_token: access_token
      }
    end
  end

end
