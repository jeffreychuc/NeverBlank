json.by_id do
  @notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title
    end
  end
end

json.ordered do
  json.array! @note_ids
end
