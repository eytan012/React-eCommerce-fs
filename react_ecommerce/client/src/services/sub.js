import axios from "axios";

const api = "http://localhost:5000/api";

export const getSubs = async () => {
	return axios.get(`${api}/subs`);
};

export const getSub = async (slug) => {
	return axios.get(`${api}/subs/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
	await axios.delete(`${api}/subs/${slug}`, {
		headers: {
			authtoken,
		},
	});
};

export const updateSub = async (slug, sub, authtoken) => {
return	await axios.put(`${api}/subs/${slug}`, sub, {
		headers: {
			authtoken,
		},
	});
};

export const createSub = async (name, category, authtoken) => {
	const parent = category.parent;
	return axios.post(
		`${api}/subs`,
		{ name, parent },
		{
			headers: {
				authtoken,
			},
		}
	);
};
