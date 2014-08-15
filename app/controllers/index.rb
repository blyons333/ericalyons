

get '/' do
  # Look in app/views/index.erb
  user_erica = User.where(username: 'erica')[0]
  return erb(:index, 
		     :layout => true, 
		     :locals => {:user => user_erica})
end

get '/about' do
	erb :about
end

get '/blog' do
	user_erica = User.where(username: 'erica')[0]
	return erb(:blog, 
		       :layout => true, 
		       :locals => {:user => user_erica})
end

get '/contact' do
	erb :contact
end

