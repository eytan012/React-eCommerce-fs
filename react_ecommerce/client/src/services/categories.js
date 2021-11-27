import axios from "axios";

const api = "http://localhost:5000/api";
export const getCategories = async () => {
	return axios.get(`${api}/categories`);
};

export const getCategory = async (slug) => {
	return axios.get(`${api}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
	await axios.delete(`${api}/category/${slug}`, {
		headers: {
			authtoken,
		},
	});
};

export const updateCategory = async (slug, name, authtoken) => {
	await axios.put(
		`${api}/category/${slug}`,
		{ name },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const createCategory = async (categoryName, authtoken) => {
	return axios.post(`${api}/category`, categoryName, {
		headers: {
			authtoken,
		},
	});
};
