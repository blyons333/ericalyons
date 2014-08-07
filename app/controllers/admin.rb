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

	unless title == "" && post_text == ""
		cur_user = User.find(session[:user_id])
		new_post = cur_user.add_post({:title => title,
						   			  :post_text => post_text,
						   			  :tags => tags,
						   			  :images => images})

		return erb(:_single_post, 
				   :layout => false, 
				   :locals => new_post.generate_view_locals())
	else
		return ""
	end

end

post '/admin/remove-tag-from-post' do
	

end

get '/admin/homepage' do
	cur_user = User.find(session[:user_id])
	return erb(:admin_homepage, 
		       :layout => true, 
		       :locals => {:user => cur_user})
end
