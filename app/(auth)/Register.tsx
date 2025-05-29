import { signup } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const PRIMARY_COLOR = "#1a237e";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const INPUT_HEIGHT = 48;
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_INPUT = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const { setIsAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
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
		mutationFn: () => signup(username, password, image || ""),
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
		<View style={styles.container}>
			<View style={styles.viewCenter}>
				<TouchableOpacity onPress={pickImage}>
					<View style={styles.image}>{image && <Image style={styles.image} source={{ uri: image }} />}</View>
				</TouchableOpacity>
				<Text style={styles.inputLabel}>Username</Text>
				<TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setUsername(text.toLowerCase())} />
				<Text style={styles.inputLabel}>Password</Text>
				<TextInput placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text.toLowerCase())} />

				<TouchableOpacity onPress={handleRegister} style={styles.submitButton}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Register Hab!b!</Text>
				</TouchableOpacity>
				<Text style={styles.footerText}>
					Got account, <Link href="/(auth)/Login"> Login Hab!b! </Link>
				</Text>
			</View>
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: BG_COLOR,
		paddingHorizontal: 16,
	},
	viewCenter: {
		alignItems: "center",
		width: CONTENT_WIDTH,
	},
	title: {
		fontSize: FONT_SIZE_TITLE,
		fontWeight: "bold",
		color: PRIMARY_COLOR,
		marginBottom: 24,
		textAlign: "center",
	},
	inputLabel: {
		alignSelf: "flex-start",
		fontWeight: "600",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		marginBottom: 6,
		marginTop: 12,
	},
	input: {
		borderWidth: 1.5,
		borderColor: BORDER_COLOR,
		borderRadius: BORDER_RADIUS,
		height: INPUT_HEIGHT,
		width: "100%",
		paddingHorizontal: 14,
		fontSize: FONT_SIZE_INPUT,
		backgroundColor: "#fff",
		marginBottom: 8,
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 60,
		marginBottom: 24,
		alignSelf: "center",
		backgroundColor: "#e8eaf6",
		borderWidth: 2,
		borderColor: BORDER_COLOR,
	},
	submitButton: {
		backgroundColor: PRIMARY_COLOR,
		width: "100%",
		height: BUTTON_HEIGHT,
		borderRadius: BORDER_RADIUS,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 18,
		marginBottom: 10,
		elevation: 2,
	},
	linkText: {
		color: PRIMARY_COLOR,
		fontWeight: "600",
		fontSize: 15,
	},
	footerText: {
		marginTop: 8,
		fontSize: 15,
		color: "#333",
		textAlign: "center",
	},
});
