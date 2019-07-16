class User < ApplicationRecord
  def authenticate(params)
    !!params
  end
end
