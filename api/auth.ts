import mainAPI from ".";
import { storeToken } from "./storage";

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

  console.log("api res : ", username, " ", password);
  const { data } = await mainAPI.post("/auth/login", { username, password });

  if (data.token) {
    await storeToken(data.token);
  }

  return data;
};

export { signin, signup };
