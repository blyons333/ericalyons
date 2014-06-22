class CreatePostTag < ActiveRecord::Migration
  def change
  	create_table :post_tag do |t|
  		t.belongs_to :post
  		t.belongs_to :tag
  	end
  end
end
