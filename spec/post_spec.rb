require 'spec_helper'

RSpec::Matchers.define :exist_in_database do
  match do |actual|
    actual.class.exists?(actual.id)
  end
end
	
def create_user(user_name, password)
	if (!User.find_by_username(user_name))
		this_user = User.create(username: user_name)
		this_user.password = password
		this_user.save
	end
end

describe Post, "#Post CRUD" do
	test_username = "test"
	user = nil

  	it "creates a new user for testing" do
  		create_user(test_username, "testPassword123")
  		user = User.find_by_username(test_username)
  	end

	it "creates new post with title and text" do
		post1 = user.posts.create do |p|
			p.title = "test title" 
			p.post_text = "this is the text"
		end
		post1.title.should eq("test title")
	end

	it "finds all posts for user" do
		post2 = user.posts.create do |p|
			p.title = "test title2" 
			p.post_text = "this is the text2"
		end

		all_posts = user.posts
		all_posts.count.should eq(2)
	end

	it "edits a post for a user" do
		post = user.posts[0]
		post.title = "new title"
		post.save
		new_title = Post.find_by_id(post.id).title
		new_title.should eq("new title")
	end

	it "delete post" do
		all_posts = user.posts
		user.posts[0].destroy
		all_posts[0].should_not exist_in_database
	end

	it "delete all posts" do
		post2 = user.posts.create do |p|
			p.title = "test title2" 
			p.post_text = "this is the text2"
		end
		post2.save
		all_posts = user.posts
		user.posts.destroy_all
		all_posts = user.posts
		all_posts.count.should eq(0)
	end
end 

describe Post, '#Associating tags to posts' do
	test_username = "test"
	user = nil

	it "creates a new user for testing" do
  		create_user(test_username, "testPassword123")
  		user = User.find_by_username(test_username)
  	end

	it "adds a tag to a post" do
		post1 = user.posts.create do |p|
			p.title = "test title" 
			p.post_text = "this is the text"
		end

		#Add a tag
		post1.add_tag("tag1")
		post1.tags.count.should eq(1)

		post1.add_tag("tag2")
		post1.tags.count.should eq(2)

	end

	it "deletes a tag from a post" do
		#Create a post with tags
		tagged_post = user.posts.create do |p|
			p.title = "tagged post" 
			p.post_text = "this post will have tags"
		end
		#Add some tags
		tagged_post.add_tag("tag1")
		tagged_post.add_tag("tag2") 

		#Get the ID of an added tag
		tag_id = tagged_post.tags[0].id

		#Remove the tag
		tagged_post.remove_tag(tag_id)

		#Make sure the tag is removed
		removed_tags = tagged_post.tags.where(id: tag_id)
		removed_tags.count.should eq(0)

		#Make sure there is still one tag left
		tagged_post.tags.count.should eq(1)

		#Make sure the tag didn't get deleted from
		#the tags database
		deleted_tag = Tag.find(tag_id)
		deleted_tag.should_not be_nil

	end

end

