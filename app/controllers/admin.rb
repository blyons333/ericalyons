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

	# if User.authenticate(user, pass)
	# 	session[:user_id] = 1
	# 	p session
	# 	redirect to '/admin/homepage'
	# else
	# 	@error = true
	# 	erb :login
	# end
	this_user = User.create(username: user)
	this_user.password = pass
	this_user.save
	redirect '/'
end

get '/admin/homepage' do


	erb :admin_homepage
end