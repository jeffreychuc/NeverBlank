class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render json: { status: "#{@user.email} logged in!" }
    else
      render json: { status: 'Incorrect email or password.' }, status: 422
    end
  end

  def destroy
    if current_user
      logout
      render json: { status: 'logged out' }
    else
      render json: { status: 'no user logged in' }, status: 404
    end
  end
end

