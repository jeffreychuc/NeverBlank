class Api::NotebooksController < ApplicationController
  def index
    if current_user
      @notebooks = Note.where(author_id: current_user.id)
      if @notebooks
        @notebooks_updated_at_desc = @notebooks.order(updated_at: :desc).pluck(:id)
        @notebooks_updated_at_asce = @notebooks.order(updated_at: :asc).pluck(:id)
        @notebooks_created_at_desc = @notebooks.order(created_at: :desc).pluck(:id)
        @notebooks_created_at_asce = @notebooks.order(created_at: :asc).pluck(:id)
        @notebooks_title_desc = @notebooks.order(title: :desc).pluck(:id)
        @notebooks_title_asce = @notebooks.order(title: :asc).pluck(:id)
        render :index
      end
    else
      render json: {notebooks: 'must be logged in'}
    end
  end

  def create
    if current_user
      @notebook = Note.new(note_params)
      @notebook.author_id = current_user.id
      if @notebook.save
        render json: @notebook
      else
        render json: { notes: @notebook.errors.full_messages }, status: 500
      end
    else
      render json: {notes: 'must be logged in'}
    end
  end

  def update
    @notebook = current_user.notes.find_by(id: params[:id])
    if @notebook && @notebook.update(note_params)
      render json: {notes: "success saved #{@notebook.id} #{@notebook.title}" }, status: 200
    else
      render json: {notes: 'Error, notebook does not exist'}, status: 404
    end
  end

  def destroy
    @notebook = current_user.notes.find_by(id: params[:id])
    if @notebook.destroy
      render json: @notebook
    else
      render json: @notebook.errors.full_messages, status: 500
    end
  end

  private

  def note_params
    params.require(:note).permit(:title)
  end
end
