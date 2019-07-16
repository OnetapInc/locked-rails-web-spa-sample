module Api
  module V1
    class SessionsController < ApplicationController
      def new
      end
      def create
        # puts(User.all.inspect)
        user = User.find_by(email: params[:email].downcase, password: params[:password])
        puts('inspect',user.inspect)
        puts('user',user)
        puts('params',params)
        if user && user.authenticate(params[:password])
          render :json => {result: 'OK user'}, status: 200
        else
          render :json => {result: 'email or password invalid'}, status: 404
        end
      end
    end
  end
end