const config = {
	header: {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json"
		}
	},
	api: {
		// base: 'http://localhost:5000',
		verify: '/api/u/verify',
		signin: '/api/u/signin',
		signup: '/api/u/signup',
		posts: '/api/posts',
		categories: '/api/categories'
	}
}

module.exports = config;