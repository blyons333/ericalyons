require 'rubygems'
require 'database_cleaner'
require 'rack/test'
require 'sinatra'
require 'sinatra/base'

# All our specs should require 'spec_helper' (this file)

# If RACK_ENV isn't set, set it to 'test'.  Sinatra defaults to development,
# so we have to override that unless we want to set RACK_ENV=test from the
# command line when we run rake spec.  That's tedious, so do it here.
ENV['RACK_ENV'] ||= 'test'

#Setting some of the application values so controller tests
#work as expected
set :session_secret, ENV['SESSION_SECRET'] || 'this is a secret shhhhh'
set :app_file, "/Users/britneylyons/Documents/MyWebsite/ericalyons"
set :views, File.join("/Users/britneylyons/Documents/MyWebsite/ericalyons", "app", "views")
enable :sessions

#Adding this for controller testing
def app
  Sinatra::Application
end

# Using the database cleaner gem to
# clear out the database after every test suite
RSpec.configure do |config|

  #Adding this for controller testing
  config.include Rack::Test::Methods

  #If running all the tests at once, configuring
  #this to before(:all) works. If you're running
  #tests individually, configure to before(:suite)
  config.before(:all) do
    DatabaseCleaner.clean_with(:truncation)
    DatabaseCleaner.start
  end

  config.after(:all) do
  	DatabaseCleaner.clean
  end

  #Not sure what these do, copied them
  #from the example
  # config.before(:each) do
  #   DatabaseCleaner.strategy = :transaction
  # end

  # config.before(:each, :js => true) do
  #   DatabaseCleaner.strategy = :truncation
  # end

  #These settings will start the transaction fore
  #each test instead of the test suite
  # config.before(:each) do
  #   DatabaseCleaner.start
  # end

  # config.after(:each) do
  #   DatabaseCleaner.clean
  # end

end

require File.expand_path("../../config/environment", __FILE__)
