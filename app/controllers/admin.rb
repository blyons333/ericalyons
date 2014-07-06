before '/admin/*' do
	if check_session == false
		redirect '/'
	end
end

get '/login' do
	erb :login
end

post '/verify-login' do
	puts "THESE ARE THE PARAMS"
	pass = params[:password]
	user = params[:username]

#	this_user = User.create(username: user)
#	this_user.password = pass
#	this_user.save

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

get '/admin/homepage' do
	erb :admin_homepage
end
