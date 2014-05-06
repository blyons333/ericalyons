

get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/about' do
	erb :about
end

get '/blog' do
	erb :blog
end

get '/contact' do
	erb :contact
end

