module Api
  module V1
    class UsersController < ApplicationController
      def new
        if User.find_by(email: params[:email]) 
          render :json => {message: 'email is already exist'}, :status => 404
        else
          User.create(email: params[:email], password: params[:password])
          render :json => {message: 'ok'}, :status => 200
        end
      end
    end
  end
end