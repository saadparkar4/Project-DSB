import { signin } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, Redirect, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const PRIMARY_COLOR = "#000042";
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
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	if (isAuthenticated) {
		return <Redirect href={"/"} />;
	}
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [mistakes, setMistakes] = useState("");
	const [checking, setChecking] = useState(false);
	const router = useRouter();

	const { mutate, mutateAsync, data } = useMutation({
		mutationKey: ["login"],
		mutationFn: () => signin(username, password),
		onSuccess: () => {
			alert("Ahlan hab!b!...");
			setIsAuthenticated(true);
			router.replace("/");
			console.log("this workedd inside usuMtation", mutate);
		},
		onError: () => {},
	});

	// Layman zod schema
	const checkForm = z.object({
		user: z
			.string()
			.min(1, { message: "Please type your username." })
			.max(20, { message: "Username must be 20 letters or less." })
			.regex(/^[a-zA-Z0-9\/_-]+$/, { message: "Username can only use a-z, A-Z, 0-9, /, -, _" }),
		pass: z
			.string()
			.min(6, { message: "Password needs 6 letters at least." })
			.max(20, { message: "Password must be 20 letters or less." })
			.regex(/^[a-zA-Z0-9\/_-]+$/, { message: "Password can only use a-z, A-Z, 0-9, /, -, _" }),
	});

	const tryLogin = async () => {
		setMistakes("");
		setChecking(true);
		const check = checkForm.safeParse({ user: username, pass: password });
		if (!check.success) {
			setMistakes(check.error.errors[0].message);
			setChecking(false);
			return;
		}
		try {
			await mutateAsync();
		} catch (error: any) {
			if (error?.response?.data?.message?.toLowerCase().includes("not found")) {
				setMistakes("User not found");
			} else if (error?.response?.data?.message?.toLowerCase().includes("password")) {
				setMistakes("Incorrect password");
			} else {
				setMistakes("Login failed. Please try again.");
			}
			setChecking(false);
			return;
		}
		setChecking(false);
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
				<Text style={{ color: "#d32f2f", marginBottom: mistakes ? 8 : 0 }}>{mistakes}</Text>
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.inputLabel}>Username</Text>
				<TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setUsername(text.toLowerCase())} value={username} />
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.inputLabel}>Password</Text>
				<TextInput
					placeholder="Password"
					style={styles.input}
					onChangeText={(text) => setPassword(text.toLowerCase())}
					value={password}
					secureTextEntry
				/>
			</View>

			<View>
				<View style={styles.viewCenter}>
					<TouchableOpacity onPress={tryLogin} style={styles.submitButton} disabled={checking}>
						<Text style={{ color: "white", fontWeight: "bold" }}>{checking ? "Checking..." : "Login Hab!b!"}</Text>
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
