
var auth = {

	api: 'http://localhost:8000/api/',
	user: function(successCallback)
	{
		axios.get(`${auth.api}user`, {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('token')
			}
		}).then(function(authUser){
			successCallback(authUser.data);
		}).catch(function(err) {
			console.log(err)
			window.location.href = '/users/login.html'
		})
	}
}