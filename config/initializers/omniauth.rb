Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'], scope: "user:email"
  OmniAuth.config.logger = Logger.new(STDOUT)
  OmniAuth.logger.progname = "omniauth"
end
