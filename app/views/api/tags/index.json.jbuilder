json.by_id do
  @tags.each do |tag|
    json.set! tag.id do
      json.extract! tag, :name
    end
  end
end

json.ordered do
  json.array! @alpha_tags
end

json.counts @count
