before '/admin/*' do
	if check_session == false
		redirect '/'
	end
end

get '/login' do
	erb :login
end

post '/verify-login' do
	user = params[:username]
	pass = params[:password]

	#User creation methods
#	this_user = User.create(username: user)
#       this_user.password = pass
#       this_user.save
	#End user creation methods

	if User.authenticate(user, pass)
		cur_user = User.find_by_username(user)
		session[:user_id] = cur_user.id
		redirect to '/admin/homepage'
	else
		@error = true
		erb :login
	end
end

post '/admin/logout' do
	session.clear
	redirect to '/'
end	

post '/admin/add-post' do
	title = params[:title]
	post_text = params[:post_text]
	tags = params[:tags]
	images = params[:images]

	cur_user = User.find(session[:user_id])
	new_post = cur_user.add_post({:title => title,
					   			  :post_text => post_text,
					   			  :tags => tags,
					   			  :images => images})

	return erb(:_single_post, 
			   :layout => false, 
			   :locals => new_post.generate_view_locals())

end

post '/admin/delete-post' do
	post_id = params[:post_id]
	cur_user = User.find(session[:user_id])
	cur_user.delete_post(post_id)
	return ""
end

post '/admin/remove-tag-from-post' do
	post_id = params[:post_id]
	tag_id = params[:tag_id]

	cur_user = User.find(session[:user_id])
	post_to_remove_tag = cur_user.posts.find(post_id)
	post_to_remove_tag.remove_tag(tag_id)
	return ""
end

post '/admin/remove-tag' do
	tag_id = params[:tag_id]

	cur_user = User.find(session[:user_id])
	posts_affected = cur_user.delete_all_tags(tag_id)
	return ""
end

post '/admin/add-tag-to-post' do
	post_id = params[:post_id]
	tag_id = params[:tag_id]
	
	cur_user = User.find(session[:user_id])
	new_tag = cur_user.add_tag_to_post(post_id, tag_id)
	return new_tag
end

post '/admin/get-available-tags' do
	cur_user = User.find(session[:user_id])
	return erb(:available_tags, :layout => false, :locals => {:unique_tags => cur_user.get_unique_tags()})
end

get '/admin/homepage' do
	cur_user = User.find(session[:user_id])
	return erb(:admin_homepage, 
		       :layout => true, 
		       :locals => {:user => cur_user})
end
