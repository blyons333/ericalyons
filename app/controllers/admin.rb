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
	session[:user_id] = ""
	redirect to '/'
end	

get '/admin/homepage' do
	erb :admin_homepage
end