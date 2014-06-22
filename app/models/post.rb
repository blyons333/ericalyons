class Post < ActiveRecord::Base
  has_many :images
  has_many :post_tags
  has_many :tags, through :post_tags
end
