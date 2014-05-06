helpers do

	def check_session
		if session[:user_id] == 1
			return true
		else
			return false
		end
	end

end