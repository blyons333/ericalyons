helpers do

	def check_session
		if session[:user_id].blank?
			return false
		else
			return true
		end
	end

end