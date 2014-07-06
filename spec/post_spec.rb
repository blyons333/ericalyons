require 'spec_helper'

	@@test_username = "test"
	def create_user(user_name, password)
		if (!User.find_by_username("test"))
			this_user = User.create(username: user_name)
			this_user.password = password
			this_user.save
		end
	end

describe Post, "#create" do
	def app
    	Sinatra::Application
  	end

  	it "creates a new user for testing" do
  		create_user(@@test_username, "testPassword123")
  	end

	it "creates new post with title and text" do
		user = User.find_by_username(@@test_username)
		new_post = Post.create do |p|
			p.title = "test title" 
			p.post_text = "this is the text"
			p.user = user
		end
		new_post.title.should eq("test title")
	end

	it "finds all posts for user" do
		user = User.find_by_username("test")
		#user_posts = Post.
	end
end 

