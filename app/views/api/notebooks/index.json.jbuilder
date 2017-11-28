json.ordered do
  json.created_at_desc do
    json.array! @notebooks_created_at_desc
  end
end

json.by_id do
  @notebooks.each do |notebook|
    json.set! notebook.id do
      json.partial! 'api/notebooks/notebook', notebook: notebook
    end
  end
end
