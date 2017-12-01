class Api::TagsController < ApplicationController

  def index
    if current_user
      @tags = current_user.tags ||= []
      @tag_ids = []
      @tags.order(:name).each do |tag|
        @tag_ids.push(tag.id)
      end
      @alpha_tags = {}
      @count = {}
      if current_user.tags
        @tags.each do |tag|
          letter = tag.name.slice(0,1).upcase
          @alpha_tags[letter] ||= []
          @alpha_tags[letter] << tag
          @count[tag.id] = tag.notes.length
        end
      end
      render :index
    end
  end

  def create
    if current_user
      @tag = Tag.new(tag_params)
      @tag.author_id = current_user.id
      if @tag.name.length > 0 && @tag.save
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

  def show
    if current_user
      @notes = current_user.tags.find(params[:id]).notes
      @note_ids = []
      @notes.each do |note|
        @note_ids.push(note.id)
      end
      render :show
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
