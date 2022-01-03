import axios from "axios";

const api = "http://localhost:5000/api";

export const createProduct = async (product, authtoken) => {
	return axios.post(`${api}/product`, product, {
		headers: {
			authtoken,
		},
	});
};
export const deleteProduct = async(slug,authtoken)=>{
	return axios.delete(`${api}/product/${slug}`,{
		headers:{
			authtoken
		}
	})
}

export const getProduct = async (slug) => {
	return axios.get(`${api}/product/${slug}`);
};

export const getProductsByCount = async (count) => {
	return axios.get(`${api}/products/${count}`);
};

export const updateProduct = async (slug,product, authtoken) => {
	return axios.put(`${api}/product/${slug}`, product, {
		headers: {
			authtoken,
		},
	});
};