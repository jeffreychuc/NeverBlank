class Api::NotesController < ApplicationController
  def index
    if current_user
      @notes = Note.where(author_id: current_user.id).order(:updated_at)
      if @notes
        render :index
      end
    end
  end
end
