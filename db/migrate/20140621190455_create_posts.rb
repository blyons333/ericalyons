class CreatePosts < ActiveRecord::Migration
  def change
  	create_table :posts do |t|
  		t.string :title
  		t.text :post_text
  		t.timestamps
  		t.has_many :images
  	end
  end
end
