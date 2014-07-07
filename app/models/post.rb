#Posts have:
#id
#user_id
#title
#post_text
#timestamp
# require 'tag'
# require 'post_tag'

class Post < ActiveRecord::Base
  belongs_to :user
  has_many :images
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
end
