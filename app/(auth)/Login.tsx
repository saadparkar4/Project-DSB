import { signin } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	//   const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	const { mutate, data } = useMutation({
		mutationKey: ["Login"],
		mutationFn: () => signin(userName, password),
		onSuccess: () => {
			alert("Ahlan hab!b!...");
			setIsAuthenticated(true);
			router.replace("/");
			console.log("this workedd", mutate);
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
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				gap: 20,
				backgroundColor: "white",
			}}>
			<View style={styles.viewCenter}>
				<Image
					source={{
						uri: "https://media.istockphoto.com/id/1409346938/vector/mobile-registration-profile-verification-login-password-concept-vector-flat-graphic-design.jpg?s=612x612&w=0&k=20&c=8cVc1-mq6ZA26RHbQCma8gaN-TBGD_uGZpxDOeh5gFU=",
					}}
					style={styles.image}
				/>
			</View>

			<View style={styles.viewCenter}>
				<Text style={{ fontSize: 25, fontWeight: "bold", color: "#000035" }}>Login Hab!b!</Text>
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.inputLabel}>Username</Text>
				<TextInput placeholder="Username" style={styles.input} onChangeText={(text) => setUserName(text)}></TextInput>
			</View>

			<View style={styles.viewCenter}>
				<Text style={styles.inputLabel}>Password</Text>
				<TextInput placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text)}></TextInput>
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
	viewCenter: {
		alignItems: "center",
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
	image: {
		height: 200,
		width: 200,
		alignItems: "center",
	},
	submitButton: {
		backgroundColor: "#000035",
		width: "60%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginBottom: 20,
	},
});
