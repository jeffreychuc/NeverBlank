class Api::TagsController < ApplicationController

  def index
    if current_user
      @tags = current_user.tags
      render :index
    end
  end

  def create
    if current_user
      @tag = Tag.new(tag_params)
      if @tag.save
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: 500
      end
    else
      render json: { tags: 'must be logged in to create tags' }
    end
  end

  def update
    @tag = current_user.tags.find_by(id: params[:id])
    if @tag && @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors.full_messages, status: 500
    end
  end


  def destroy
    @tag = current_user.tags.find_by(id: params[:id])
    if @tag.destroy
      render json: @tag
    else
      render json: @tag.errors.full_messages, status: 500
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name, :author_id)
  end
end
