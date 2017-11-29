class Api::NotebooksController < ApplicationController
  def index
    if current_user
      @notebooks = Notebook.where(author_id: current_user.id)
      if @notebooks
        @notebooks_created_at_desc = @notebooks.order(created_at: :desc).pluck(:id)
        @notebook_arr = []
        @notebooks_created_at_desc.map {|notebook_id| @notebook_arr.push([notebook_id, [current_user.notes.find_by(notebook_id: notebook_id)]])}
        render :index
      end
    else
      render json: {notebooks: 'must be logged in'}
    end
  end

  def create
    if current_user
      @notebook = Notebook.new(note_params)
      @notebook.author_id = current_user.id
      if @notebook.save
        render json: @notebook
      else
        render json: { notebooks: @notebook.errors.full_messages }, status: 500
      end
    else
      render json: {notebooks: 'must be logged in'}
    end
  end

  def update
    @notebook = current_user.notebooks.find_by(id: params[:id])
    if @notebook && @notebook.update(note_params)
      render json: {notebooks: "success saved #{@notebook.id} #{@notebook.title}" }, status: 200
    else
      render json: {notebooks: 'Error, notebook does not exist'}, status: 404
    end
  end

  def destroy
    @notebook = current_user.notebooks.find_by(id: params[:id])
    if @notebook.destroy
      @notes = current_user.notes.find_by(notebook_id: params[:id])
      if @notes
        @notes.destroy_all
      end
      render json: @notebook
    else
      render json: @notebook.errors.full_messages, status: 500
    end
  end

  private

  def note_params
    params.require(:notebook).permit(:title)
  end
end
