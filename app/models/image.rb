# Image has:
# id
# post_id
# caption
# URL

class Image < ActiveRecord::Base
  belongs_to :post
end
