// import { deposit } from "@/api";
// import { me } from "@/api/auth";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useLocalSearchParams } from "expo-router";
// import { useState } from "react";
// import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// const PRIMARY_COLOR = "#000042";
// const BORDER_RADIUS = 16;
// const BORDER_COLOR = "#c5cae9";
// const BG_COLOR = "#f5f6fa";

// export default function DepositLinkPage() {
// 	const { username: ownerUsername, amount: initialAmount } = useLocalSearchParams();
// 	const { data: currentUser, isLoading } = useQuery({
// 		queryKey: ["myprofile"],
// 		queryFn: me,
// 	});
// 	const [amount, setAmount] = useState(initialAmount ? Number(initialAmount) : 0);
// 	const [mistakes, setMistakes] = useState("");
// 	const [checking, setChecking] = useState(false);
// 	const [success, setSuccess] = useState(false);

// 	const { mutate: depositMutate } = useMutation({
// 		mutationKey: ["DepositFromLink"],
// 		mutationFn: () => deposit(amount),
// 		onSuccess: () => {
// 			setSuccess(true);
// 			setMistakes("");
// 		},
// 		onError: () => {
// 			setMistakes("Deposit failed. Please try again.");
// 		},
// 	});

// 	const isOwner = currentUser?.username === ownerUsername;

// 	const handleDeposit = () => {
// 		setMistakes("");
// 		setChecking(true);
// 		if (!amount || amount <= 0 || !/^\d+$/.test(String(amount))) {
// 			setMistakes("Please enter a valid amount (numbers only, greater than 0).");
// 			setChecking(false);
// 			return;
// 		}
// 		depositMutate();
// 		setChecking(false);
// 	};

// 	if (isLoading) {
// 		return (
// 			<View style={styles.centered}>
// 				<ActivityIndicator size="large" color={PRIMARY_COLOR} />
// 			</View>
// 		);
// 	}

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.card}>
// 				<Text style={styles.title}>Deposit Link</Text>
// 				<Text style={styles.label}>Account Owner:</Text>
// 				<Text style={styles.value}>{ownerUsername}</Text>
// 				{isOwner ? (
// 					<>
// 						<Text style={styles.label}>Amount</Text>
// 						<TextInput
// 							style={styles.input}
// 							keyboardType="numeric"
// 							value={amount ? String(amount) : ""}
// 							onChangeText={(text) => {
// 								if (/^\d*$/.test(text)) setAmount(Number(text));
// 							}}
// 							autoCapitalize="none"
// 							autoCorrect={false}
// 							placeholder="Enter amount"
// 						/>
// 						{!!mistakes && <Text style={styles.error}>{mistakes}</Text>}
// 						<TouchableOpacity style={styles.button} onPress={handleDeposit} disabled={checking}>
// 							<Text style={styles.buttonText}>{checking ? "Checking..." : "Deposit to My Account"}</Text>
// 						</TouchableOpacity>
// 						{success && <Text style={styles.success}>Deposit successful!</Text>}
// 					</>
// 				) : (
// 					<>
// 						<Text style={styles.label}>Amount to Transfer</Text>
// 						<Text style={styles.value}>{amount}</Text>
// 						{!!mistakes && <Text style={styles.error}>{mistakes}</Text>}
// 						<TouchableOpacity style={styles.button} onPress={handleDeposit} disabled={checking}>
// 							<Text style={styles.buttonText}>{checking ? "Checking..." : `Deposit to ${ownerUsername}`}</Text>
// 						</TouchableOpacity>
// 						{success && <Text style={styles.success}>Deposit successful!</Text>}
// 					</>
// 				)}
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: BG_COLOR,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		padding: 16,
// 	},
// 	card: {
// 		backgroundColor: "#fff",
// 		borderRadius: BORDER_RADIUS,
// 		padding: 24,
// 		width: "100%",
// 		maxWidth: 400,
// 		alignItems: "center",
// 		shadowColor: "#000",
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 8,
// 		elevation: 4,
// 	},
// 	title: {
// 		fontSize: 22,
// 		fontWeight: "bold",
// 		color: PRIMARY_COLOR,
// 		marginBottom: 16,
// 	},
// 	label: {
// 		fontSize: 16,
// 		color: PRIMARY_COLOR,
// 		fontWeight: "600",
// 		marginTop: 12,
// 	},
// 	value: {
// 		fontSize: 18,
// 		color: PRIMARY_COLOR,
// 		marginBottom: 8,
// 		fontWeight: "bold",
// 	},
// 	input: {
// 		borderWidth: 1.5,
// 		borderColor: BORDER_COLOR,
// 		borderRadius: BORDER_RADIUS,
// 		height: 48,
// 		width: "100%",
// 		paddingHorizontal: 14,
// 		fontSize: 16,
// 		backgroundColor: "#f5f6fa",
// 		marginBottom: 8,
// 		marginTop: 4,
// 	},
// 	button: {
// 		backgroundColor: PRIMARY_COLOR,
// 		width: "100%",
// 		borderRadius: BORDER_RADIUS,
// 		padding: 12,
// 		alignItems: "center",
// 		marginTop: 12,
// 		marginBottom: 10,
// 	},
// 	buttonText: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 		fontSize: 18,
// 	},
// 	error: {
// 		color: "#d32f2f",
// 		marginBottom: 8,
// 		marginTop: 4,
// 	},
// 	success: {
// 		color: "#388e3c",
// 		marginTop: 8,
// 		fontWeight: "bold",
// 	},
// 	centered: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// });
