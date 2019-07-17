class AccessToken < ApplicationRecord
  belongs_to :user

  # @param [Integer] user_id
  def self.create(user_id)
    user = User.find_by(id: user_id)
    raise 'invalid user' if user.blank?

    access_token = AccessToken.new
    access_token.user_id = user_id
    access_token.token = SecureRandom.uuid
    access_token.expired_at = DateTime.now + 365
    access_token.save!

    access_token
  end

end
