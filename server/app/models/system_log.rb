class SystemLog < ApplicationRecord

  # 対処は必要ではないが運用が知ることができると助けになる情報
  LEVEL_INFO = 1
  # 好ましくないが、運用対処は運用対処は必要ない場合
  LEVEL_WARNING = 2
  # 運用対処が必要(不正データの発見など)
  LEVEL_ERROR = 3
  # 即座に運用対処が必要(決済系やバッチのクラッシュなど)
  LEVEL_FATAL = 4

  def self.info(category, message)
    create!(
      level: LEVEL_INFO,
      category: category,
      message: message
    )
  end

  def self.warn(category, message)
    create!(
      level: LEVEL_WARNING,
      category: category,
      message: message
    )
  end

  def self.error(category, message)
    begin
      ErrorHandlingService.notify_message("CATEGORY: #{category}\n#{message}")
    rescue => e
      # ignore
    end
    create!(
      level: LEVEL_ERROR,
      category: category,
      message: message
    )
  end

  def self.fatal(category, message)
    begin
      OperationMailer.fatal_error(category, message).deliver_later
      ErrorHandlingService.notify_message("CATEGORY: #{category}\n#{message}")
    rescue => e
      # ignore
    end
    create!(
      level: LEVEL_FATAL,
      category: category,
      message: message
    )
  end

end
