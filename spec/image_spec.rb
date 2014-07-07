require 'spec_helper'

describe Image, '#Image CRUD' do
  it "creates a new image" do
  	image = Image.create { |i|
  		i.caption = "This is the caption"
  		i.url = "www.test.com"
  	}
  	image.save
  	test_image = Image.find(image)
  	test_image.id.should eq(1)
  	test_image.caption.should eq("This is the caption")
  	test_image.url.should eq("www.test.com")
  	Image.all.count.should eq(1)
  end

  it "creates a second image" do
  	image2 = Image.create {|i|
  		i.caption = "Another caption"
  		i.url = "www.secondTest.com"
  	}
  	image2.save
  	test_image = Image.find(image2)
  	test_image.id.should eq(2)
  	test_image.caption.should eq("Another caption")
  	test_image.url.should eq("www.secondTest.com")
  end

  it "updates an image caption" do
  	image = Image.find(1)
  	image.caption = "Second caption"
  	image.save

  	test_image = Image.find(1)
  	test_image.caption.should eq("Second caption")
  	Image.all.count.should eq(2)
  end

  it "updates an image url" do
  	image = Image.find(1)
  	image.url = "www.test2.com"
  	image.save

  	test_image = Image.find(1)
  	test_image.url.should eq("www.test2.com")
  	Image.all.count.should eq(2)
  end

  it "deletes an image" do
  	image = Image.find(1)
  	image.destroy()
  	image.save

  	Image.all.count.should eq(1)
  end
end
