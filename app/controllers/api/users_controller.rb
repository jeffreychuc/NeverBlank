class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      # @default_notebook = Notebook.new
      # @default_notebook.title = 'Default Notebook'
      # @default_notebook.author_id = @user.id
      # @default_notebook.save
      # code above for default notebooks
      login(@user)
      render json: @user
    else
      render json: { session: @user.errors.full_messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
