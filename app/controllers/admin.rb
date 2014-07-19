before '/admin/*' do
	if check_session == false
		redirect '/'
	end
end

get '/login' do
	erb :login
end

post '/verify-login' do
#	this_user = User.create(username: user)
#	this_user.password = pass
#	this_user.save
	user = params[:username]
	pass = params[:password]
	if User.authenticate(user, pass)
		cur_user = User.find_by_username(user)
		session[:user_id] = cur_user.id
		p session
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
	body = params[:body]
	unless title == "" && body == ""
		cur_user = User.find(session[:user_id])
		new_post = cur_user.posts.create { |p|
					p.title = title
					p.post_text = body
					}
		return erb(:_single_post, :layout => false, :locals => {:id => new_post.id, :title => title, :body => body})
	else
		return ""
	end

end

get '/admin/homepage' do
	erb :admin_homepage
end
