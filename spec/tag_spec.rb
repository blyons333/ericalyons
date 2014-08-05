require 'spec_helper'

describe Tag, "#Tag CRUD" do
	  it "creates a new tag" do
	  	tag = Tag.create_or_get_existing("test")
	  	expect(Tag.where(name: "test")).to exist
	  end

	  it "retrieve an existing tag" do
	  	tag = Tag.create_or_get_existing("test")
	  	all_tags_with_name = Tag.where(name: "test")
	  	all_tags_with_name.count.should eq(1)
	  end

	  it "make sure tags are case-insensitive" do
	  	tag1 = Tag.create_or_get_existing("Test")
	  	tag2 = Tag.create_or_get_existing("TEST")
	  	tag1.id.should eq(tag2.id)

	  	all_tags_with_name = Tag.where(name: "test")
	  	all_tags_with_name.count.should eq(1)
	  end

	  it "try to create an existing tag" do
	  	tag = Tag.create_or_get_existing("test")
	  	all_tags_with_name = Tag.where(name: "test")
	  	all_tags_with_name.count.should eq(1)
	  end

	  it "edit tag" do
	  	tag = Tag.create_or_get_existing("test")
	  	tag.name = "second test"
	  	tag.save
	  	new_tag = Tag.find(tag.id)
	  	new_tag.name.should eq("second test")
	  	all_tags_with_name = Tag.where(name: "test")
	  	all_tags_with_name.count.should eq(0)
	  	all_tags_with_new_name = Tag.where(name: "second test")
	  	all_tags_with_new_name.count.should eq(1)
	  end

	  it "delete tag" do
	  	tag = Tag.create_or_get_existing("second test")
	  	tag.destroy
	  	all_tags_with_name = Tag.where(name: "second test")
	  	all_tags_with_name.count.should eq(0)
	  end

end
