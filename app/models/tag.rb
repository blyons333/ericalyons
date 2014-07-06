# Tag has: 
# id 
# text 
# timestamp

class Tag < ActiveRecord::Base
	has_many :post_tags
	has_many :posts, through: :post_tags
	validates_uniqueness_of :name
	def self.create_or_get_existing(tag_name)
		tag_name.downcase!
		tag = Tag.where(name: tag_name)
		if (tag.exists?)
			tag = tag[0]
		else
			tag = Tag.create { |t|
				t.name = tag_name
			}
		end
		return tag
	end
end
