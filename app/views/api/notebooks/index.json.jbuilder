json.ordered do
  json.updated_at_desc do
    json.array! @notebooks_updated_at_desc
  end
  json.updated_at_asce do
    json.array! @notebooks_updated_at_asce
  end
  json.created_at_desc do
    json.array! @notebooks_created_at_desc
  end
  json.created_at_asce do
    json.array! @notebooks_created_at_asce
  end
  json.title_desc do
    json.array! @notebooks_title_desc
  end
  json.title_asce do
    json.array! @notebooks_title_asce
  end
end

json.by_id do
  @notebooks.each do |notebook|
    json.set! notebook.id do
      json.partial! 'api/notebooks/notebook', notebook: notebook
    end
  end
end
