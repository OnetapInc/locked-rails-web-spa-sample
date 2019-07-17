class CreateInitialTables < ActiveRecord::Migration[5.1]
  def change

    create_table :users do |t|
      t.column :name, :string, limit: 80, null: true
      t.column :email, :string, limit: 200, charset: 'latin1', null: true
      t.column :introduction, :string, limit: 200, null: true
      t.column :profile_image, :string, limit: 512, null: true
      t.column :invite_code, :string, limit: 50, charset: 'latin1'
      t.column :information_check_time, :datetime, null: true
      t.column :status, :integer, default: 1, comment: '1: 通常, 2: 正常退会'
      t.timestamps

      t.index :invite_code, unique: true
      t.index :email
      t.index :name
    end

    create_table :mail_login_logs do |t|
      t.column :email, :integer, null: false
      t.column :result, :integer, null: false
      t.column :created_at, :datetime, null: false

      t.index :email
      t.index :created_at
    end

    create_table :access_tokens do |t|
      t.column :user_id, :integer, null: false
      t.column :token, :string, limit: 200, charset: 'latin1', null: false
      t.column :expired_at, :datetime, null: false
      t.timestamps

      t.index :user_id
      t.index :token, unique: true
    end

    # サインアップ申請
    create_table :sign_up_requests do |t|
      t.column :token, :string, limit: 80, charset: 'latin1', null: false
      t.column :email, :string, limit: 200, charset: 'latin1', null: true
      t.column :password_salt, :string, limit: 80, charset: 'latin1', null: true
      t.column :password_digest, :string, limit: 80, charset: 'latin1', null: true
      t.column :expired_at, :datetime, null: false
      t.timestamps

      t.index :token
    end

    # パスワード忘れ対応用
    create_table :password_reset_requests do |t|
      t.column :email, :string
      t.column :token, :string, limit: 200, charset: 'latin1'
      t.column :expired_at, :datetime, null: false
      t.timestamps

      t.index :token
    end

    create_table :mail_change_requests do |t|
      t.column :token, :string, limit: 80, null: false, charset: 'latin1'
      t.column :user_id, :integer, null: false
      t.column :email, :string, null: false, limit: 200, charset: 'latin1'
      t.column :expired_at, :datetime, null: false
      t.timestamps

      t.index :token
    end

    # DEPRECATED:
    #
    # アカウント情報の変更にメールによる確認を行う
    create_table :account_change_requests do |t|
      t.column :token, :string, limit: 80, charset: 'latin1', null: false
      t.column :user_id, :integer, null: false
      t.column :email, :string, limit: 200, charset: 'latin1', null: true
      t.column :password_salt, :string, limit: 80, charset: 'latin1', null: true
      t.column :password_digest, :string, limit: 80, charset: 'latin1', null: true
      t.column :expired_at, :datetime
      t.timestamps

      t.index :token
      t.index :user_id
    end

    create_table :user_authentications do |t|
      t.column :user_id, :integer, null: false
      t.column :password_salt, :string, limit: 80, charset: 'latin1', null: true
      t.column :password_digest, :string, limit: 80, null: true
      t.timestamps

      t.index :user_id, unique: true
    end

    create_table :associated_accounts do |t|
      t.column :user_id, :integer, null: false
      t.column :service, :string, null: false
      t.column :name, :string, limit: 200
      t.column :service_user_id, :string, charset: 'latin1'
      t.column :access_token, :string, charset: 'latin1', limit: 512
      t.column :token_secret, :string, charset: 'latin1', limit: 512
      t.column :refresh_token, :string, charset: 'latin1', limit: 512, null: true
      t.column :expired_at, :datetime, null: true
      t.timestamps

      t.index :user_id
    end

    create_table :system_logs do |t|
      t.column :level, :integer, null: false
      t.column :category, :string, null: false
      t.column :message, :text, limit: 4_294_967_295, null: false
      t.timestamps

      t.index [:created_at, :category]
      t.index [:created_at, :level]
    end
  end
end
