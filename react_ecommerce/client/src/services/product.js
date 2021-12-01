import axios from "axios";

const api = "http://localhost:5000/api";

export const createProduct = async (product, authtoken) => {
	return axios.post(`${api}/product`, product, {
		headers: {
			authtoken,
		},
	});
};
