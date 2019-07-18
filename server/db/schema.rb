# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2017_08_29_000000) do

  create_table "access_tokens", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "token", limit: 200, null: false, collation: "latin1_swedish_ci"
    t.datetime "expired_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_access_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_access_tokens_on_user_id"
  end

  create_table "account_change_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "token", limit: 80, null: false, collation: "latin1_swedish_ci"
    t.integer "user_id", null: false
    t.string "email", limit: 200, collation: "latin1_swedish_ci"
    t.string "password_salt", limit: 80, collation: "latin1_swedish_ci"
    t.string "password_digest", limit: 80, collation: "latin1_swedish_ci"
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_account_change_requests_on_token"
    t.index ["user_id"], name: "index_account_change_requests_on_user_id"
  end

  create_table "associated_accounts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "service", null: false
    t.string "name", limit: 200
    t.string "service_user_id", collation: "latin1_swedish_ci"
    t.string "access_token", limit: 512, collation: "latin1_swedish_ci"
    t.string "token_secret", limit: 512, collation: "latin1_swedish_ci"
    t.string "refresh_token", limit: 512, collation: "latin1_swedish_ci"
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_associated_accounts_on_user_id"
  end

  create_table "mail_change_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "token", limit: 80, null: false, collation: "latin1_swedish_ci"
    t.integer "user_id", null: false
    t.string "email", limit: 200, null: false, collation: "latin1_swedish_ci"
    t.datetime "expired_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_mail_change_requests_on_token"
  end

  create_table "mail_login_logs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "email", null: false
    t.integer "result", null: false
    t.datetime "created_at", null: false
    t.index ["created_at"], name: "index_mail_login_logs_on_created_at"
    t.index ["email"], name: "index_mail_login_logs_on_email"
  end

  create_table "password_reset_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "email"
    t.string "token", limit: 200, collation: "latin1_swedish_ci"
    t.datetime "expired_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_password_reset_requests_on_token"
  end

  create_table "sign_up_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "token", limit: 80, null: false, collation: "latin1_swedish_ci"
    t.string "email", limit: 200, collation: "latin1_swedish_ci"
    t.string "password_salt", limit: 80, collation: "latin1_swedish_ci"
    t.string "password_digest", limit: 80, collation: "latin1_swedish_ci"
    t.datetime "expired_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_sign_up_requests_on_token"
  end

  create_table "system_logs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "level", null: false
    t.string "category", null: false
    t.text "message", limit: 4294967295, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at", "category"], name: "index_system_logs_on_created_at_and_category"
    t.index ["created_at", "level"], name: "index_system_logs_on_created_at_and_level"
  end

  create_table "user_authentications", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "password_salt", limit: 80, collation: "latin1_swedish_ci"
    t.string "password_digest", limit: 80
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_authentications_on_user_id", unique: true
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", limit: 80
    t.string "email", limit: 200, collation: "latin1_swedish_ci"
    t.string "introduction", limit: 200
    t.string "profile_image", limit: 512
    t.string "invite_code", limit: 50, collation: "latin1_swedish_ci"
    t.datetime "information_check_time"
    t.integer "status", default: 1, comment: "1: 通常, 2: 正常退会"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "locked_token"
    t.index ["email"], name: "index_users_on_email"
    t.index ["invite_code"], name: "index_users_on_invite_code", unique: true
    t.index ["name"], name: "index_users_on_name"
  end

end
