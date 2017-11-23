class NotesController < ApplicationController
  
  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id
    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def show
    @note = Note.find(params[:id])
    if @note
      render :show
    else
      render json: @chirp.errors.full_messages, status: 404
    end
  end

  def index
    @notes = Note.find_by(author_id: current_user.id)
  end
end
