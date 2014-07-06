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
  end
