class ApplicationController < ActionController::Base
  # Prrevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  include SessionsHelper

  def board
    render text: "Design Job Board!"
  end

end
