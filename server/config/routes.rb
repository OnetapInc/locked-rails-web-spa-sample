Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      post 'auth/sign-up', to: 'auth#sign_up'
      post 'auth/sign-up-confirm', to: 'auth#sign_up_confirm'
      get 'auth/verify', to: 'auth#verify'
      post 'auth/login', to: 'auth#login'
      get 'auth/load', to: 'auth#load'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
