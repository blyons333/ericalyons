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
		post1 = Post.create do |p|
			p.title = "test title" 
			p.post_text = "this is the text"
			p.user = user
		end
		post1.title.should eq("test title")
	end

	it "finds all posts for user" do
		# create_user(@@test_username, "testPassword123")
		user = User.find_by_username("test")
		# post1 = Post.create do |p|
		# 	p.title = "test title" 
		# 	p.post_text = "this is the text"
		# 	p.user = user
		# end

		post2 = Post.create do |p|
			p.title = "test title2" 
			p.post_text = "this is the text2"
			p.user = user
		end

		all_posts = Post.find_all_by_user_id(user)
		all_posts.count.should eq(2)
	end
end 

