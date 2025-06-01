import { signup } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
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

const Register = () => {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const router = useRouter();
	if (isAuthenticated) {
		router.replace("/");
		return null;
	}

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [mistakes, setMistakes] = useState("");
	const [checking, setChecking] = useState(false);
	const [showDepositLink, setShowDepositLink] = useState(false);
	const [depositLinkAmount, setDepositLinkAmount] = useState(0);
	const [generatedLink, setGeneratedLink] = useState("");

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

	// Layman zod schema for register
	const checkForm = z.object({
		user: z
			.string()
			.min(1, { message: "Please type your username." })
			.max(20, { message: "Username must be 20 characters or less." })
			.regex(/^[a-zA-Z0-9\/_-]+$/, { message: "Username can only use a-z, A-Z, 0-9, /, -, _" }),
		pass: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." })
			.max(20, { message: "Password must be 20 characters or less." })
			.regex(/^[a-zA-Z0-9\/_-]+$/, { message: "Password can only use a-z, A-Z, 0-9, /, -, _" }),
		img: z.string().optional(),
	});

	const { mutate, mutateAsync } = useMutation({
		mutationKey: ["Register"],
		mutationFn: () => signup(username, password, image || ""),
		onSuccess: () => {
			alert("Ahlan hab!b!...");
			setIsAuthenticated(true);
			router.replace("/");
			console.log("this was success");
		},
		onError: () => {},
	});

	const tryRegister = async () => {
		setMistakes("");
		setChecking(true);
		const lookFor = checkForm.safeParse({ user: username, pass: password, img: image || undefined });
		if (!lookFor.success) {
			setMistakes(lookFor.error.errors[0].message);
			setChecking(false);
			return;
		}
		try {
			await mutateAsync();
		} catch (error: any) {
			setMistakes("Registration failed. Please try again.");
			setChecking(false);
			return;
		}
		setChecking(false);
	};

	const handleGenerateLink = () => {
		if (!username || !depositLinkAmount) {
			setMistakes("Please enter an amount to generate a link.");
			return;
		}
		const link = `https://yourapp.com/deposit?username=${encodeURIComponent(username)}&amount=${depositLinkAmount}`;
		setGeneratedLink(link);
		setShowDepositLink(true);
	};

	return (
		<View style={styles.container}>
			<View style={styles.viewCenter}>
				<TouchableOpacity onPress={pickImage}>
					<View style={styles.image}>{image && <Image style={styles.image} source={{ uri: image }} />}</View>
				</TouchableOpacity>
				<Text style={{ color: "#d32f2f", marginBottom: mistakes ? 8 : 0 }}>{mistakes}</Text>
				<Text style={styles.inputLabel}>Username</Text>
				<TextInput placeholder="Username" style={styles.input} autoCapitalize="none" autoCorrect={false} onChangeText={(text) => setUsername(text)} />
				<Text style={styles.inputLabel}>Password</Text>
				<TextInput
					placeholder="Password"
					style={styles.input}
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={(text) => setPassword(text)}
				/>
				<TouchableOpacity onPress={tryRegister} style={styles.submitButton} disabled={checking}>
					<Text style={{ color: "white", fontWeight: "bold" }}>{checking ? "Checking..." : "Register Hab!b!"}</Text>
				</TouchableOpacity>
				<Text style={styles.footerText}>
					Got account, <Link href="/(auth)/Login"> Login Hab!b! </Link>
				</Text>
				{/* Deposit link section */}
				{!showDepositLink && (
					<View style={{ width: "100%", marginBottom: 16 }}>
						<Text style={styles.inputLabel}>Generate Deposit Link</Text>
						<TextInput
							placeholder="Amount to deposit"
							style={styles.input}
							keyboardType="numeric"
							onChangeText={(text) => {
								if (/^\d*$/.test(text)) setDepositLinkAmount(Number(text));
							}}
							value={depositLinkAmount ? String(depositLinkAmount) : ""}
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<TouchableOpacity onPress={handleGenerateLink} style={styles.submitButton}>
							<Text style={{ color: "white", fontWeight: "bold" }}>Generate Link</Text>
						</TouchableOpacity>
					</View>
				)}
				{showDepositLink && (
					<View style={{ width: "100%", marginBottom: 16, alignItems: "center" }}>
						<Text style={{ marginBottom: 8, color: PRIMARY_COLOR, fontWeight: "bold" }}>Share this link:</Text>
						<Text selectable style={{ color: PRIMARY_COLOR, marginBottom: 8, textAlign: "center" }}>{generatedLink}</Text>
						<TouchableOpacity onPress={() => setShowDepositLink(false)} style={styles.submitButton}>
							<Text style={{ color: "white", fontWeight: "bold" }}>Create Another</Text>
						</TouchableOpacity>
					</View>
				)}
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
