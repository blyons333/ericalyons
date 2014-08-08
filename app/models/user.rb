require 'bcrypt'
require 'json'

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
        puts properties[:images]
        properties[:images].each { |i|
          puts i[1].to_s
          new_post.add_image(i[1])
        }
      end

      return new_post
    end

    def add_tag_to_post(post_id, tag_id)
      cur_post = posts.find(post_id)
      new_tag = cur_post.add_tag_by_id(tag_id)
      return new_tag
    end

    def get_unique_tags()
      unique_tags = Set.new() 
      posts.each { |p|
        p.tags.each { |t|
          unique_tags.add(t)
        }
      }
      return unique_tags
    end

    def delete_all_tags(tag_id)
      posts_affected = Array.new()
      posts.each { |p|
        if p.remove_tag(tag_id)
          posts_affected.push(p.id)
        end
      }
      return posts_affected
    end

  end
