class UserAuthentication < ApplicationRecord

  belongs_to :user

  NATURAL_NUMBER = {only_integer: true, greater_than_or_equal_to: 0}

  validates :user_id, presence: true, numericality: NATURAL_NUMBER, uniqueness: true
  validates :password_digest, presence: true

  def self.make_salt
    SecureRandom.hex(20)
  end

  # パスワードのダイジェスト文字列を生成する
  def self.make_digest(salt, password)
    Digest::SHA256.hexdigest("#{salt}:#{password}")
  end

  def self.create_for_sign_up(user_id, salt, password_digest)
    raise 'user_id must be set' if user_id.blank?
    raise 'salt must be set' if salt.blank?
    raise 'password_digest must be set' if password_digest.blank?

    auth = UserAuthentication.new
    auth.user_id = user_id
    auth.password_digest = password_digest
    auth.password_salt = salt
    auth.save!
    auth
  end

  def update_password(password)
    raise 'found invalid password' unless valid_password?(password)

    salt = UserAuthentication.make_salt
    digest = UserAuthentication.make_digest(salt, password)
    update!(
      password_salt: salt,
      password_digest: digest
    )
  end

  def match_password?(password)
    raise 'found invalid password' unless valid_password?(password)

    digest = UserAuthentication.make_digest(password_salt, password)
    password_digest == digest
  end

  def valid_password?(password)
    return false if password.blank?
    return false if password.size < 6
    return false unless password =~ /^[a-zA-Z0-9_\-@!%#]+$/
    true
  end
end
