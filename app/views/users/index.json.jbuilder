json.array!(@users) do |user|
  json.extract! user, :id, :name, :github
  json.url user_url(user, format: :json)
end
