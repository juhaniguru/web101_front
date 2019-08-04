
var auth = {

	user: function(successCallback)
	{
		axios.get('http://localhost:8000/api/user', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('token')
			}
		}).then(function(authUser){
			successCallback(authUser.data);
		}).catch(function(err) {
			console.log(err)
			window.location.href = 'http://localhost:8001/users/login.html'
		})
	}
}