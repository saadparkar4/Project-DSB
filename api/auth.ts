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

	//response
	const { data } = await mainAPI.post("signup", formData); //request
	// response alot of info { data: {"token": "eyekdhfiohsifoisyfowefh", "message": "user created succesfully"}}

	if (data.token) {
		await storeToken(data.token);
	}

	return data;
};

//login
const signin = async (username: string, password: string) => {
	const { data } = await mainAPI.post("signin", { username, password });

	if (data.token) {
		await storeToken(data.token);
	}

	return data;
};

export { signin, signup };
