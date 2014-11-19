class SessionsController < ApplicationController

  def new
  end

 # def create
 #   user = User.find_by(name: params[:session][:name])
 #   if user && user.authenticate(params[:session][:github])
 #     # Log the user in and redirect to the user's show page.
 #   else
 #     flash.now[:danger] = 'Invalid email/password combination' # Not quite right!
 #     render 'new'
 #   end
 # end
 
 def create
  auth = request.env['omniauth.auth']
  user = User.find_by_provider_and_uid(auth["provider"],auth["uid"]) || User.create_with_omniauth(auth)
  session[:user_id] = user.id
  redirect_to root_url, :notice => "Signed in!"
 end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Signed out!"
  end
end
