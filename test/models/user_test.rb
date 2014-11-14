require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
      @user = User.new(name: "Example User", github: "user@example.com")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = "    "
    assert_not @user.valid?
  end 

  test "github should be present" do
    @user.github = "   "
    assert_not @user.valid?
  end

  test "name shouldn't be too long" do
    @user.name = "a" * 40
    assert_not @post.valid?
  end

  test "name should be unique" do
    duplicate_user = @user.dup
    duplicate_user.name = @user.name.upcase
    @user.save
    assert_not duplicate_post.valid?
  end
end
