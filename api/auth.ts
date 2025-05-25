// we will create the functions responsible for calling the auth endpoints

import mainAPI from ".";
import { storeToken } from "./storage";

// register

const signup = async (username: string, password: string, image: string) => {
	const formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);
	formData.append("image", {
		name: "image.jpg",
		uri: image,
		type: "image/jpeg",
	} as any);

	const registerUser = {
		username: username,
		image: image,
		password: password,
	};
	const { data } = await mainAPI.post("/auth/register", registerUser);

	if (data.token) {
		await storeToken(data.token);
	}
	console.log("Token ", data.token);

	return data;
};

//login
const signin = async (username: string, password: string) => {
	const { data } = await mainAPI.post("/auth/login", {
		username,
		password,
	});

	if (data.token) {
		await storeToken(data.token);
	}

	return data;
};

export { signin, signup };
