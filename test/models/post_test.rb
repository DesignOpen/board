require 'test_helper'

class PostTest < ActiveSupport::TestCase

    def setup
        @post = Post.new(title: "new post",
                         summary: "n/a",
                         url: "https://github.com/DesignOpen/",
                         issue: "n/a",
                         contact_info: "design open group",
                         user_id: 1)
    end

    test "should be valid" do
        assert @post.valid?
    end

    test "title should be present" do
        @post.title = "   "
        assert_not @post.valid?
    end

    test "url should be present" do
        @post.url = "   "
        assert_not @post.valid?
    end

    test "contact_info should be present" do
        @post.contact_info = "   "
        assert_not @post.valid?
    end

    test "title should not be too long" do
        @post.title = "a" * 51
        assert_not @post.valid?
    end

    test "title should be unique" do
        duplicate_post = @post.dup
        duplicate_post.title = @post.title.upcase
        @post.save
        assert_not duplicate_post.valid?
    end
end
