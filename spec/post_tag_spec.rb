require 'spec_helper'

RSpec::Matchers.define :exist_in_database do
  match do |actual|
    actual.class.exists?(actual.id)
  end
end

def create_user(user_name, password)
	this_user = User.find_by_username(user_name)
	if (!this_user)
		this_user = User.create(username: user_name)
		this_user.password = password
		this_user.save
	end

	return this_user
end

describe PostTag, '#PostTag CRUD' do
  user = create_user("test", "testPassword123")

  it "create using a post and tag" do
  	post = user.posts.create{|p|
  							p.title = "test title" 
							p.post_text = "this is the text"
  							}
  	tag = Tag.create_or_get_existing("test tag")						
  	post.tags.push(tag)
  	#tag = post.tags.create_or_get_existing("test tag")
  	tag.save
  	post_tag = PostTag.find(1)
  	post_tag.tag_id.should eq(tag.id)
  	post_tag.post_id.should eq(post.id)
  	post.tags.count.should eq(1)
  	PostTag.all.count.should eq(1)
  end

  it "add a second tag to post" do
  	post = user.posts[0]
  	tag = Tag.create_or_get_existing("test tag 2")
  	tag.save
  	post.tags.push(tag)
  	post = user.posts[0]
  	post_tag = PostTag.find(2)
  	post_tag.tag_id.should eq(tag.id)
  	post_tag.post_id.should eq(post.id)
  	post.tags.count.should eq(2)
  	PostTag.all.count.should eq(2)
  end

  it "deleting a tag should delete PostTag" do
  	post = user.posts[0]
  	tag = Tag.find(2)
  	post_tag = PostTag.find(2)
  	tag.destroy()
  	post_tag.should_not exist_in_database
  	PostTag.all.count.should eq(1)
  end

  it "deleting a post should delete post_tag" do
  	post = user.posts[0]
  	post.tags.count.should eq(1)
  	post_tag = PostTag.find(1)
  	post.destroy()
  	post_tag.should_not exist_in_database
  	PostTag.all.count.should eq(0)
  end
  
end
