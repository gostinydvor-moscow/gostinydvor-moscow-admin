import jwt_decode from 'jwt-decode';

import { servicesHost } from './myDataProvider';

export default {
	login: ({ email, password }) => {
		const request = new Request(`${servicesHost}/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
			.then(response => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(({ accessToken }) => {
				sessionStorage.setItem('token', accessToken);
			});
	},
	logout: () => {
		sessionStorage.removeItem('token');
		return Promise.resolve();
	},
	checkError: error => {
		// if (error.status === 403) {
		// 	sessionStorage.removeItem('token');
			
		// 	window.location.reload();
		// }

		//return Promise.resolve();
		// const token = sessionStorage.getItem('token');

		// const request = new Request('http://127.0.0.1:8000/api/refresh', {
		// 	method: 'GET',
		// 	headers: new Headers({ 'Authorization': `Bearer ${token}` }),
		// });
		// return fetch(request)
		// 	.then(response => {
		// 		if (response.status < 200 || response.status >= 300) {
		// 			throw new Error(response.statusText);
		// 		}
		// 		return response.json();
		// 	})
		// 	.then(({ token }) => {
		// 		sessionStorage.setItem('token', token);

		// 		window.location.reload();
		// 	})
		// 	.catch(() => {
		// 		//sessionStorage.removeItem('token', token);

		// 		//window.location.reload();
		// 	});
	},
	checkAuth: () => {
		const token = sessionStorage.getItem('token');

		if (token) {
			const { exp } = jwt_decode(token);
			if (exp > (new Date().getTime() / 1000) - 1440) {
				return Promise.resolve();
			} else {
				const request = new Request(`${servicesHost}/refresh`, {
					method: 'GET',
					headers: new Headers({ 'Authorization': `Bearer ${token}` }),
				});
				const response = fetch(request)
					.then(response => {
						if (response.status !== 200) {
							throw new Error(response.statusText);
						}
						return response.json();
					})
					.then(({ token }) => {
						sessionStorage.setItem('token', token);
						return Promise.resolve();
					});

				return response;
			}
		}
		return Promise.reject();
	},
	getPermissions: () => {
		const role = sessionStorage.getItem('permissions');
		return role ? Promise.resolve(role) : Promise.reject();
	}
};