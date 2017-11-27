class Api::NotesController < ApplicationController
  def index
    if current_user
      @notes = Note.where(author_id: current_user.id)
      if @notes
        @notes_updated_at_desc = @notes.order(updated_at: :desc).map(&:id)
        @notes_updated_at_asce = @notes.order(updated_at: :asc).map(&:id)
        @notes_created_at_desc = @notes.order(created_at: :desc).map(&:id)
        @notes_created_at_asce = @notes.order(created_at: :asc).map(&:id)
        @notes_title_desc = @notes.order(title: :desc).map(&:id)
        @notes_title_asce = @notes.order(title: :asc).map(&:id)
        render :index
      end
    end
  end

  def create
    if current_user
      @note = Note.new(note_params)
      @note.author_id = current_user.id
      if @note.save
        render json: @note
      else
        render json: { notes: @note.errors.full_messages }, status: 500
      end
    else
      render json: {notes: 'must be logged in'}
    end
  end

  def update
    @note = current_user.notes.find_by(id: params[:id])
    if @note && @note.update(note_params)
      render json: {notes: "success saved #{@note.id} #{@note.title} #{@note.body}" }, status: 200
    else
      render json: {notes: 'Error, note does not exist'}, status: 404
    end
  end

  def destroy
    @note = current_user.notes.find_by(id: params[:id])
    if @note.destroy
      render json: @note
    else
      render json: @note.errors.full_messages, status: 500
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :body, :bodypreview, :notebook_id)
  end
end
