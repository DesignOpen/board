class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :summary
      t.text :url
      t.text :issue
      t.text :contact_info
      t.text :user_id

      t.timestamps null: false
    end
  end
end
