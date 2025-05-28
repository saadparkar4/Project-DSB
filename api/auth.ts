import { mainAPI } from "./index";
import { storeToken } from "./storage";

const signup = async (username: string, password: string, image: string) => {
	const formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);
	formData.append("image", {
		name: "image.jpg",
		uri: image,
		type: "image/*",
	} as any);

	const registerUser = {
		username: username,
		image: image,
		password: password,
	};
	const { data } = await mainAPI.post("/auth/register", registerUser, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	if (data.token) {
		await storeToken(data.token);
	}
	console.log("Token ", data.token);

	return data;
};

const signin = async (username: string, password: string) => {
	const loginUser = {
		username: username,
		password: password,
	};

	const { data } = await mainAPI.post("/auth/login", loginUser);
	//changed to get the loginUser

	if (data.token) {
		await storeToken(data.token);
	}

	return data;
};

const me = async () => {
	const { data } = await mainAPI.get("auth/me");

	return data;
};
const my = async () => {
	const { data } = await mainAPI.get("/transactions/my");

	return data;
};

//added this
const allUsers = async () => {
	const { data } = await mainAPI.get("/auth/users");

	return data;
};

const transferFunds = async (username: string, amount: number) => {
	const { data } = await mainAPI.put(`/transactions/transfer/${username}`, { amount });

	return data;
};

const updateProfile = async (image: string) => {
	const formData = new FormData();
	formData.append("image", {
		name: "image.jpg",
		uri: image,
		type: "image/*",
	} as any);

	const updateImage = {
		image: image,
	};
	const { data } = await mainAPI.put("auth/profile", updateImage, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
};
export { allUsers, me, my, signin, signup, transferFunds, updateProfile };
