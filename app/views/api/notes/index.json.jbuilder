json.ordered do
  json.updated_at_desc do
    json.array! @notes_updated_at_desc
  end
  json.updated_at_asce do
    json.array! @notes_updated_at_asce
  end
  json.created_at_desc do
    json.array! @notes_created_at_desc
  end
  json.created_at_asce do
    json.array! @notes_created_at_asce
  end
  json.title_desc do
    json.array! @notes_title_desc
  end
  json.title_asce do
    json.array! @notes_title_asce
  end
end

json.by_id do
  @notes.each do |note|
    json.set! note.id do
      json.partial! 'api/notes/note', note: note
    end
  end
end
