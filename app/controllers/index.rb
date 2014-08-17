

get '/' do
  # Look in app/views/index.erb
  user_erica = User.where(username: 'erica')[0]
  return erb(:index, 
		     :layout => true, 
		     :locals => {:user => user_erica})
end

post '/filter-posts-by-tags' do
	tag_filters = params[:tags];
	user_erica = User.where(username: 'erica')[0]
	tag_filter_objects = Tag.find_all_by_id(tag_filters)
	if tag_filter_objects.count == 0
		tag_filter_objects = Array.new()
		filtered_posts = user_erica.posts.ordered_by_reverse
	else
		filtered_posts = user_erica.get_filtered_posts(tag_filters)
	end
	
	return erb(:blog,
			   :layout => false,
			   :locals => {:posts => filtered_posts,
			   			   :tag_filters => tag_filter_objects
			   			  })
end

# get '/about' do
# 	erb :about
# end

# get '/blog' do
# 	user_erica = User.where(username: 'erica')[0]
# 	return erb(:blog, 
# 		       :layout => true, 
# 		       :locals => {:user => user_erica})
# end

# get '/contact' do
# 	erb :contact
# end

