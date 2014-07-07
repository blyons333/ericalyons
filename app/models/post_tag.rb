# PostTag has:
# tag_id
# post_id

class PostTag < ActiveRecord::Base
	belongs_to :post
	belongs_to :tag
end
