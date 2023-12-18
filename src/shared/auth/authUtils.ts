import { getToken } from './authStorage';

const checkAuthentication = async () => {
	try {
		const userToken = await getToken();
		return userToken;
	} catch (error) {
		console.error('Error checking authentication:', error);
		return null;
	}
};

export { checkAuthentication };
