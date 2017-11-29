json.ordered do
  json.created_at_desc do
    json.array! @notebook_arr.each do |notebook_pair|
      json.set! notebook_pair[0] do
        json.array! notebook_pair[1].collect{ |note| note.ids }.flatten
      end
    end
  end
end

json.by_id do
  @notebooks.each do |notebook|
    json.set! notebook.id do
      json.partial! 'api/notebooks/notebook', notebook: notebook
    end
  end
end
