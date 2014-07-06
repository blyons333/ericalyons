require 'spec_helper'

RSpec::Matchers.define :exist_in_database do

  match do |actual|
    actual.class.exists?(actual.id)
  end

end
	
	def create_user(user_name, password)
		if (!User.find_by_username("test"))
			this_user = User.create(username: user_name)
			this_user.password = password
			this_user.save
		end
	end

describe Post, "#Post CRUD" do
	test_username = "test"
	user = nil
	def app
    	Sinatra::Application
  	end

  	it "creates a new user for testing" do
  		create_user(test_username, "testPassword123")
  		user = User.find_by_username(test_username)
  	end

	it "creates new post with title and text" do
		post1 = Post.create do |p|
			p.title = "test title" 
			p.post_text = "this is the text"
			p.user = user
		end
		post1.title.should eq("test title")
	end

	it "finds all posts for user" do
		post2 = Post.create do |p|
			p.title = "test title2" 
			p.post_text = "this is the text2"
			p.user = user
		end

		all_posts = Post.find_all_by_user_id(user)
		all_posts.count.should eq(2)
	end

	it "edits a post for a user" do
		post = Post.find_by_user_id(user.id)
		post.title = "new title"
		post.save
		new_title = Post.find_by_id(post.id).title
		new_title.should eq("new title")
	end

	it "delete post" do
		all_posts = Post.find_all_by_user_id(user)
		Post.destroy(all_posts[0])
		all_posts[0].should_not exist_in_database
	end

	it "delete all posts" do
		post2 = Post.create do |p|
			p.title = "test title2" 
			p.post_text = "this is the text2"
			p.user = user
		end
		all_posts = Post.find_all_by_user_id(user)
		Post.destroy(all_posts)
		all_posts = Post.find_all_by_user_id(user)
		all_posts.count.should eq(0)
	end

end 

