require 'spec_helper'

describe '#Admin controller routing' do
  it "renders the login template" do
  	get '/login'
  	expect(last_response).to be_ok
  	expect(last_response.body).to include("Login page!")
  end

  it "logs in a user" do
  	new_user = User.create(username: "blyons")
  	new_user.password = "password"
  	new_user.save

  	User.all.count.should eq(1)

  	post '/verify-login', {:username => "blyons", 
  						   :password => "password"
  						  }
  	follow_redirect!
  	expect(last_response).to be_ok
  	last_request.path.should eq('/admin/homepage')
  end
  
  it "adds a post" do
  	#must log in first...
  	User.all.count.should eq(1)
  	post '/verify-login', {:username => "blyons", 
  						   :password => "password"
  						  }

  	#Make the call to add the post
  	post '/admin/add-post', {:title => "hello", 
  							 :post_text => "this is a test", 
  							 :tags => [], 
  							 :images => []
  							}

  	#Ensure the response comes back okay
  	expect(last_response).to be_ok
  	expect(last_response.body).to include("this is a test")

  	#Make sure the post gets saved in the database
  	current_posts = Post.where(:title => "hello", 
  							   :post_text => "this is a test")
  	current_posts.count.should eq(1)
  end

  it "adds a post with tags" do
  	#must log in first...
  	User.all.count.should eq(1)
  	post '/verify-login', {:username => "blyons", 
  						   :password => "password"
  						  }

    #Make the call to add a post with tags
  	post '/admin/add-post', {:title => "hello", 
 							 :post_text => "this is a second test", 
 							 :tags => ["tag1", "tag2", "tag3"], 
 							 :images => []
 							}

  	#Ensure the response comes back okay
  	expect(last_response).to be_ok
  	expect(last_response.body).to include("this is a second test")

  	#Make sure the post gets saved in the database
  	current_posts = Post.where(:title => "hello", 
  							   :post_text => "this is a second test")
  	current_posts.count.should eq(1)

  	#Make sure the tags get saved with the post
  	current_posts[0].tags.count.should eq(3)
  end

  it "adds a post with images" do
  	#must log in first...
  	User.all.count.should eq(1)
  	post '/verify-login', {:username => "blyons", 
  						   :password => "password"
  						  }

    #Make the call to add a post with tags
  	post '/admin/add-post', {:title => "hello", 
 							 :post_text => "this is a third test", 
 							 :tags => [], 
 							 :images => [{:URL => "www.image1.com",
 							 			  :caption => "image1"},
 							 			 {:URL => "www.image2.com",
 							 			  :caption => "image2"}]
 							}

  	#Ensure the response comes back okay
  	expect(last_response).to be_ok
  	expect(last_response.body).to include("this is a third test")

  	#Make sure the post gets saved in the database
  	current_posts = Post.where(:title => "hello", 
  							   :post_text => "this is a third test")
  	current_posts.count.should eq(1)

  	#Make sure the images get saved with the post
  	current_posts[0].images.count.should eq(2)
  end

  it "adds a post with tags and images" do
	#must log in first...
  	User.all.count.should eq(1)
  	post '/verify-login', {:username => "blyons", 
  						   :password => "password"
  						  }

    #Make the call to add a post with tags
  	post '/admin/add-post', {:title => "hello", 
 							 :post_text => "this is a fourth test", 
 							 :tags => ["tag1", "tag2", "tag3"], 
 							 :images => [{:URL => "www.image1.com",
 							 			  :caption => "image1"},
 							 			 {:URL => "www.image2.com",
 							 			  :caption => "image2"}]
 							}

  	#Ensure the response comes back okay
  	expect(last_response).to be_ok
  	expect(last_response.body).to include("this is a fourth test")

  	#Make sure the post gets saved in the database
  	current_posts = Post.where(:title => "hello", 
  							   :post_text => "this is a fourth test")
  	current_posts.count.should eq(1)

  	#Make sure the tags get saved with the post
  	current_posts[0].tags.count.should eq(3)

  	#Make sure the images get saved with the post
  	current_posts[0].images.count.should eq(2)

  end

  it "logs a user out" do

  	get '/admin/logout'

  	#User should be redirected to the homepage
  	follow_redirect!
  	expect(last_response).to be_ok
  	last_request.path.should eq('/')

  	#User should no longer be able to add posts
  	post '/admin/add-post', {:title => "hello", 
  							 :post_text => "this is a test", 
  							 :tags => [], 
  							 :images => []
  							}
  	#User is no longer logged in, they should be 
  	#redirected to the homepage
  	follow_redirect!
  	expect(last_response).to be_ok
  	last_request.path.should eq('/')

  end
end
