class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @default_notebook = Notebook.new
    @default_notebook.title = 'First Notebook'
    @default_notebook.lock = true
    if @user.save
      @default_notebook.author_id = @user.id
      @default_notebook.save
      @user.default_notebook = @default_notebook.id
      @user.save
      login(@user)
      render json: @user
    else
      @default_notebook.delete
      render json: { session: @user.errors.full_messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
