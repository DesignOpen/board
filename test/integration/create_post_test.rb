require 'test_helper'
class CreatePostTest < ActionDispatch::IntegrationTest
  test "invalid create post information" do
    get new_post_path
    assert_no_difference 'Post.count' do
      post posts_path, post: { title:  "",
                               summary: "",
                               url: "foo",
                               issue: "n/a",
                               contact_info: "contact",
                               user_id: "1" }
    end
    assert_template 'posts/new'
  end
end
