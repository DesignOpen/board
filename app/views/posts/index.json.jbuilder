json.array!(@posts) do |post|
  json.extract! post, :id, :title, :summary, :url, :issue, :contact_info, :user_id
  json.url post_url(post, format: :json)
end
