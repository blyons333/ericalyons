class CreateImages < ActiveRecord::Migration
  def change
  	create_table :images do |t|
  		t.belongs_to :post
  		t.text :caption
  		t.string :url
  	end
  end
end
