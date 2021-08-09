import axios, { setToken } from "../utils/axios";

// Constants
import apiUrls from "../utils/constants";

export const signinRequest = async (values) => {
	try {
		const { data = null } = await axios.post(apiUrls.signin, values);

		const { token = null } = data;

		if (token) setToken(token);

		return data;
	} catch (error) {
		return null;
	}
};

export const signupRequest = async (values) => {
    try {
		const { data = null } = await axios.post(apiUrls.signup, values);

		const { token = null } = data;

		if (token) setToken(token);

		return data;
	} catch (error) {
		return error.response.data;
	}
}

export const getUserTokenRequest = async () => {
	try {
		const { data = null } = await axios.get(apiUrls.getUser);
		return data;
	} catch (error) {
		return null;
	}
};
