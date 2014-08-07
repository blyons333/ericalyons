#Posts have:
#id
#user_id
#title
#post_text
#timestamp
# require 'tag'
# require 'post_tag'

class Post < ActiveRecord::Base
	include ActiveModel::AttributeMethods
  belongs_to :user
  scope :ordered_by_reverse, -> { joins(:user).order('posts.created_at DESC') }
  has_many :images
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags

	def add_tag(tag_name) 
		new_tag = Tag.create_or_get_existing(tag_name)
		self.tags.push(new_tag)
	end

  def add_tag_by_id(tag_id)
    new_tag = Tag.find(tag_id)
    unless self.tags.include?(new_tag)
      self.tags.push(new_tag)
      return new_tag.name
    end
    return ""
  end

  def remove_tag(tag_id)
    tag = self.tags.where(id: tag_id)
    removed_tag = self.tags.delete(tag)
    return removed_tag.count > 0
  end

	def add_image(image)
		new_image = Image.create { |i|
			i.url = image[:URL]
			unless image[:caption].blank?
				i.caption = image[:caption]
			end
		}
		self.images.push(new_image)
	end

  def generate_view_locals()
  	return {:id => self.id, 
  			    :title => self.title, 
  			    :post_text => self.post_text, 
  			    :created_at => self.created_at,
            :tags => self.tags}
  end
end
