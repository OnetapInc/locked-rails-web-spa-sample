class User < ApplicationRecord
  include Redis::Objects

  # 通常状態
  STATUS_NORMAL = 1
  # 退会済み
  STATUS_RESIGNED = 2

  has_one :user_authentication
  has_one :payment_method
  has_many :access_tokens
  has_many :bought_posts
  has_many :follows
  has_many :backers
  has_many :members
  has_many :plan_payments
  has_many :post_pack_payments

  # 管理される記事の表示履歴. Redisで管理される
  sorted_set :post_view_histories, maxlength: 100, expiration: 30.days
  # プロジェクトの表示履歴. Redisで管理される
  sorted_set :project_view_histories, maxlength: 100, expiration: 30.days



  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :status, presence: true, inclusion: {in: [self::STATUS_NORMAL, self::STATUS_RESIGNED]}

  def login_valid?
    self.status == User::STATUS_NORMAL
  end

  # Userを作成します
  #
  # @return [User]
  def self.create_for_sign_up(email)
    raise 'email must be set' if email.blank?
    invite_code = generate_invite_code
    raise 'Failed to generate invite code.' if invite_code.nil?

    user = User.new
    user.name = 'No Name'
    user.email = email
    user.invite_code = invite_code
    user.save!

    user
  end

  def self.create_by_twitter_account(twitter_id, token, secret, name)
    invite_code = generate_invite_code
    raise 'Failed to generate invite code.' if invite_code.nil?

    user = User.new
    user.name = name
    user.invite_code = invite_code
    user.save!

    create_twitter_account(user, twitter_id, token, secret, name)

    user
  end

  def self.create_twitter_account(user, twitter_id, token, secret, name)
    ex = AssociatedAccount.new
    ex.service = 'twitter'
    ex.name = name
    ex.user_id = user.id
    ex.access_token = token
    ex.token_secret = secret
    ex.service_user_id = twitter_id
    ex.save!
    ex
  end

  def self.create_by_facebook_account(facebook_id, email, token, name)
    invite_code = generate_invite_code
    raise 'Failed to generate invite code.' if invite_code.nil?

    user = User.new
    user.name = name
    user.email = email
    user.invite_code = invite_code
    user.save!

    create_facebook_account(user, facebook_id, token, name)

    user
  end

  def self.create_facebook_account(user, facebook_id, token, name)
    ex = AssociatedAccount.new
    ex.service = 'facebook'
    ex.name = name
    ex.user_id = user.id
    ex.access_token = token
    ex.service_user_id = facebook_id
    ex.save!
    ex
  end


  # パスワードによるログイン処理
  #
  # @param [String] email
  # @param [String] password
  # @return [Hash]
  def self.login(email, password)
    raise 'email must be set' if email.blank?
    raise 'password must be set' if password.blank?

    raise satouNext::UserError.new('exceeded login trial limit', 'E01003') unless MailLoginLog.can_login?(email)
    user = User.find_by(email: email, status: User::STATUS_NORMAL)
    return nil if user.blank?
    auth = user.user_authentication
    return nil if auth.blank?
    return nil unless auth.match_password?(password)

    user.login
  end

  def login
    raise satouNext::NotPermittedError unless login_valid?
    access_token = AccessToken.create(id)
    {user: self, token: access_token.token}
  end

  def view_post(post)
    return false if post.blank?
    post_view_histories[post.id] = DateTime.now.to_i
  end

  def view_post_ids
    post_view_histories.members.map(&:to_i).reverse
  end

  def post_histories
    ids = view_project_ids
    Post.where(id: ids)
      .where.not(published_at: nil)
      .order(['field(id, ?)', ids])
  end

  def view_project(project)
    return false if project.blank?
    project_view_histories[project.id] = DateTime.now.to_i
  end

  def view_project_ids
    project_view_histories.members.map(&:to_i).reverse
  end

  def project_histories
    ids = view_project_ids
    Project.where(id: ids)
      .where.not(published_at: nil)
      .order(['field(id, ?)', ids])
  end

  # 重複しない招待コードを生成します
  #
  # @return [String]
  def self.generate_invite_code
    invite_code = nil
    gen_count = 1
    while invite_code.nil? and gen_count <= 3
      code = SecureRandom.hex(3).upcase
      invite_code = code unless User.find_by(invite_code: code).present?
      gen_count += 1
    end
    invite_code
  end

  # 退会
  def resign
    self.status = User::STATUS_RESIGNED
    save!
  end

  # 表示用の名称
  def display_name
    name.presence || 'ゲスト'
  end

  def as_json(options = {})
    if options[:all].blank?
      options[:except] ||= [:email, :status, :information_check_time, :created_at, :updated_at]
    end
    super(options)
  end

end
