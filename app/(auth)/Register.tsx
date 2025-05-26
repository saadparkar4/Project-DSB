import { signup } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const { setIsAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos", "livePhotos"],
			allowsEditing: false,
			aspect: [1, 1],
			quality: 1,
		});
		console.log(result);
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	// useMutation -> fn: signup (name, password, image) -> succesfull? setIsAuth(true) & go to home

	const { mutate } = useMutation({
		mutationKey: ["Register"],
		mutationFn: () => signup(username, image || "", password),
		onSuccess: () => {
			alert("Ahlan hab!b!...");
			setIsAuthenticated(true);
			router.replace("/");
			console.log("this was success");
		},
		onError: (error) => {
			alert("Failed hab!b!");
			console.log("this failed", mutate, error);
		},
	});

	const handleRegister = () => {
		mutate();
	};
	return (
		<View style={styles.viewCenter}>
			<TouchableOpacity onPress={pickImage}>
				<View style={styles.image}>{image && <Image style={styles.image} source={{ uri: image }} />}</View>
			</TouchableOpacity>
			<Text style={styles.inputLabel}>Username</Text>
			<TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setUsername(text)} />
			<Text style={styles.inputLabel}>Password</Text>
			<TextInput placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text)} />

			<TouchableOpacity onPress={handleRegister} style={styles.submitButton}>
				<Text style={{ color: "white", fontWeight: "bold" }}>Register Hab!b!</Text>
			</TouchableOpacity>
			<Text>
				Got account, <Link href="/(auth)/Login"> Login Hab!b! </Link>
			</Text>
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	viewCenter: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		gap: 20,
		backgroundColor: "white",
	},
	input: {
		borderWidth: 2,
		width: "60%",
		borderRadius: 20,
		padding: 10,
	},
	inputLabel: {
		alignItems: "flex-start",
		width: "60%",
		padding: 10,
		fontWeight: "bold",
		fontSize: 20,
	},
	submitButton: {
		backgroundColor: "#000035",
		width: "60%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginBottom: 20,
	},
	image: {
		alignItems: "center",
		backgroundColor: "#eeeeee",
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 24,
	},
});
