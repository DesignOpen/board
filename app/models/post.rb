class Post < ActiveRecord::Base
  belongs_to :user
  validates :title, presence: true, length: { maximum: 50 }, 
      uniqueness: { case_sensitive: false }
  validates :url, presence: true
  validates :contact_info, presence: true
  # validates :user_id, presence: true
end
