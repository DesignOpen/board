module SessionsHelper

  #logs in the given user
  def log_in(user)
    session[:user_id] =  user.id
  end

  # To access the currently logged in user
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !current_user.nil?
  end
end
