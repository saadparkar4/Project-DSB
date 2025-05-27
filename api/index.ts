import axios from "axios";
import { getToken } from "./storage";

export const mainAPI = axios.create({
	baseURL: "https://react-bank-project.eapi.joincoded.com/mini-project/api",
});

mainAPI.interceptors.request.use(async (payload) => {
	const token = await getToken();
	if (token) {
		payload.headers.Authorization = `Bearer ${token}`;
	}

	return payload;
});

export const getProfile = () => mainAPI.get("/auth/me");

export const getTransactions = () => mainAPI.get("/transactions/my");

export const getAllUsers = () => mainAPI.get("/auth/users");

export const updateProfile = () => mainAPI.put("/auth/profile");

export const deposit = async (amount: number) => {
	const { data } = await mainAPI.put("/transactions/deposit", {
		amount,
	});

	return data;
};

export const withdraw = async (amount: number) => {
	const { data } = await mainAPI.put("/transactions/withdraw", {
		amount,
	});

	return data;
};

export const transfer = () => mainAPI.put("/transactions/transfer/<username>");

export const getUserByID = () => mainAPI.get("/auth/user/<userId>");
