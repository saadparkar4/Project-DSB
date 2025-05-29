import { signin } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useContext, useState } from "react";
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

export default function Index() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	const { mutate, data } = useMutation({
		mutationKey: ["login"],
		mutationFn: () => signin(username, password),
		onSuccess: () => {
			alert("Ahlan hab!b!...");
			setIsAuthenticated(true);
			router.replace("/");
			console.log("this workedd inside usuMtation", mutate);
		},
		onError: (error) => {
			alert("Failed hab!b!");
			console.log("this failed", mutate, error);
		},
	});

	const handleLogin = () => {
		mutate();
		console.log("this worked", mutate);
	};

	return (
		<View style={styles.container}>
			<View style={styles.viewCenter}>
				<Image
					source={{
						uri: "https://media.istockphoto.com/id/1409346938/vector/mobile-registration-profile-verification-login-password-concept-vector-flat-graphic-design.jpg?s=612x612&w=0&k=20&c=8cVc1-mq6ZA26RHbQCma8gaN-TBGD_uGZpxDOeh5gFU=",
					}}
					style={styles.image}
				/>
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.title}>Login Hab!b!</Text>
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.inputLabel}>Username</Text>
				<TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setUsername(text.toLowerCase())}></TextInput>
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.inputLabel}>Password</Text>
				<TextInput placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text.toLowerCase())}></TextInput>
			</View>

			<View>
				<View style={styles.viewCenter}>
					<TouchableOpacity onPress={handleLogin} style={styles.submitButton}>
						<Text style={{ color: "white", fontWeight: "bold" }}>Login Hab!b!</Text>
					</TouchableOpacity>
					<Text>
						No account, <Link href="/(auth)/Register"> Register Hab!b! </Link>
					</Text>
				</View>
			</View>
		</View>
	);
}

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
