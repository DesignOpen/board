class JobBoardController < ApplicationController
  def home
    @users = User.all
    if params[:search]
      @posts = Post.search(params[:search]).order("created_at DESC")
      
    else
      @posts = Post.all.order('created_at DESC')
    end
  end

  def help
  end

  def about
  end
end
