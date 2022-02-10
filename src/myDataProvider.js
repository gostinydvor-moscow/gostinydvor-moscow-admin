import { fetchUtils } from "react-admin";
import restServerProvider from 'ra-data-json-server';

export const servicesHost = 'https://gdm.msk.ru:5000/api';
// http://localhost:5000/api
// https://gdm.msk.ru:5000

const httpClient = (url, options = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' });
	}
	const token = sessionStorage.getItem('token');
	options.headers.set('Authorization', `Bearer ${token}`);
	return fetchUtils.fetchJson(url, options);
};

const dataProvider = restServerProvider(servicesHost, httpClient);

const myDataProfider = {
	...dataProvider,
	create: (resource, params) => {
		let formData = new FormData();

		for (let key in params.data) {
			if (key === "imageAdmin" && params.data[key].rawFile) {
				formData.append("image", params.data[key].rawFile);
			} else if (key === "about") {
				formData.append("about", JSON.stringify(params.data[key]));
			} else if (key === "posts") {
				formData.append("posts", JSON.stringify(params.data[key]));
			} else if (key === "content") {
				formData.append('content', JSON.stringify(params.data[key]));

				for (let key2 in params.data[key]) {
					if (params.data[key][key2].imageAdmin) {
						formData.append('image-content-block' + parseFloat(parseInt(key2) + 1), params.data[key][key2].imageAdmin.rawFile);
					}
				}
			} else {
				formData.append(key, params.data[key]);
			}
		}

		return httpClient(`${servicesHost}/${resource}`, {
			method: 'POST',
			body: formData,
		}).then(({ json }) => {
			if (json.error) {
				sessionStorage.removeItem("token");

				return false;
			}
			return {
				data: { ...params.data, id: json.id }
			};
		});
	},
	update: (resource, params) => {
		let formData = new FormData();

		for (let key in params.data) {
			if (key === "imageAdmin" && params.data[key].rawFile) {
				formData.append("image", params.data[key].rawFile);
			} else if (key === "content") {
				formData.append('content', JSON.stringify(params.data[key]));

				for (let key2 in params.data[key]) {
					if (params.data[key][key2].imageAdmin) {
						formData.append('image-content-block' + parseFloat(parseInt(key2) + 1), params.data[key][key2].imageAdmin.rawFile);
					}
				}
			} else if (key === "about") {
				formData.append("about", JSON.stringify(params.data[key]));
			} else if (key === "posts") {
				formData.append("posts", JSON.stringify(params.data[key]));
			} else {
				formData.append(key, params.data[key]);
			}
		}

		formData.append("_method", "PUT");

		return httpClient(`${servicesHost}/${resource}`, {
			method: 'PUT',
			body: formData,
		}).then(({ json }) => ({ data: { ...params.data, id: json.id } }));
	},
	getOne: (resource, params) => {
		return httpClient(`${servicesHost}/${resource}/${params.id}`).then(({ json }) => ({ data: json }));
	}
};

export default myDataProfider;