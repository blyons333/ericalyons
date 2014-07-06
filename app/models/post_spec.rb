require 'spec_helper'
require 'rack/test'
require 'Post'
#require 'ericalyons'
# require 'post_tag'
# require 'tag'

describe Post, "#create" do
	include Rack::Test::Methods
	def app
    	Sinatra::Application
  	end

	it "creates new post with title and text" do
		new_post = Post.create do |p|
			p.title = "test title" 
			p.post_text = "this is the test"
		end
		new_post.save
		new_post.title.should equal("test title")
	end
end 