require 'bcrypt'

  class User < ActiveRecord::Base
    has_many :posts
    
    
    # users.password_hash in the database is a :string
    include BCrypt

    def password
      @password ||= Password.new(password_hash)
    end

    def password=(new_password)
      @password = Password.create(new_password)
      self.password_hash = @password
    end

    def self.authenticate(username, password)
      if username == "test"
        return false
      end

    	this_user = User.find_by_username(username)
    	if this_user && this_user.password == password
    		return true
    	else
    		return false
    	end
    end

    def add_post(properties)
      #Create a new post
      new_post = posts.create{ |p|
          p.title = properties[:title]
          p.post_text = properties[:post_text]
      }
      
      #Add tags to post
      unless properties[:tags].blank?
        properties[:tags].each { |t|
          new_post.add_tag(t)
        }
      end

      #Add images to post
      unless properties[:images].blank?
        properties[:images].each { |i|
          new_post.add_image(i)
        }
      end

      return new_post
    end

  end
