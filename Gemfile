source 'https://rubygems.org'
ruby "2.1.4"

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

gem 'thin'

gem 'rails',                '4.2.0.beta4'
gem 'bootstrap-sass',       '3.2.0.0'
gem 'sass-rails',           '5.0.0.beta1'
gem 'uglifier',             '2.5.3'
gem 'coffee-rails',         '4.0.1'
gem 'jquery-rails',         '4.0.0.beta2'
gem 'turbolinks',           '2.3.0'
gem 'jbuilder',             '2.2.3'
gem 'rails-html-sanitizer', '1.0.1'
gem 'sdoc',                 '0.4.0', group: :doc

group :development, :test do
  gem 'sqlite3',     '1.3.9'
  gem 'byebug',      '3.4.0'
  gem 'web-console', '2.0.0.beta3'
  gem 'spring',      '1.1.3'
end

group :test do
  gem 'minitest-reporters', '1.0.5'
  gem 'mini_backtrace',     '0.1.3'
  gem 'guard-minitest',     '2.3.1'
end

group :production do
  gem 'pg',          '0.17.1'
  gem 'rails_12factor', '0.0.2'
end
