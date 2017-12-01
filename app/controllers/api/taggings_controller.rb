class Api::TaggingsController < ApplicationController
  def create
    if current_user
      @tagging = Tagging.new(tagging_params)
      if @tagging.save
        render json: @tagging, status: 200
      else
        render json: @tagging.errors.full_messages, status: 500
      end
    else
      render json: 'must be logged in', status: 405
    end
  end

  def destroy
    if current_user
      @tagging = Tagging.where(note_id: tagging_params[:tagging][:note_id], tag_id: tagging_params[:tagging][:tag_id])
      if @tagging
        @tagging.destroy
        render json: @tagging, status: 200
      else
        render json: @tagging.errors.full_messages, status: 500
      end
    else
      render json: 'must be logged in', status: 405
    end
  end

  private

  def tagging_params
    require(:tagging).permit(:note_id, :tag_id)
  end
end
