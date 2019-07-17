class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@satou.jp'
  layout 'mailer'

  before_action :set_default_value

  def set_default_value
    @app_name = 'satou'
    @subject_prefix = '[satou]'
    @web_host = web_host
  end

  def web_host
    if Rails.env.development?
      'http://localhost:4000'
    else
      'https://satou.jp'
    end
  end
end
