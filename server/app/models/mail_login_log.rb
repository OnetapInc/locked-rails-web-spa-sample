class MailLoginLog < ApplicationRecord

  RESULT_SUCCESS = 1
  RESULT_FAILED = 2

  def self.success(email)
    create!(
      email: email,
      result: MailLoginLog::RESULT_SUCCESS
    )
  end

  def self.failed(email)
    create!(
      email: email,
      result: MailLoginLog::RESULT_FAILED
    )
  end

  # 5分以内に五回ログインに失敗していたらログイン不可とする
  def self.can_login?(email)
    where(email: email, result: MailLoginLog::RESULT_FAILED).where('created_at > ?', DateTime.now - 5.minutes).count() < 5
  end
end
