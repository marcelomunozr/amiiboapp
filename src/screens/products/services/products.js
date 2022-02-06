import axios from 'axios';

const getProductsReq = axios.create({
	baseURL: 'https://www.amiiboapi.com/api/amiibo',
});

const getProducts = async () => {
	const resp = await getProductsReq.get('/');
	return resp;
};

export {getProducts};
