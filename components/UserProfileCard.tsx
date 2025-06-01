import { allUsers, me, transferFunds } from "@/api/auth";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

interface UserCardProps {
	image: string;
	username: string;
	balance: number;
}

const UserProfileCard = ({ username, image, balance }: UserCardProps) => {
	const { data: currentUser } = useQuery({
		queryKey: ["me"],
		queryFn: me,
	});

	const { refetch: refetchProfile } = useQuery({
		queryKey: ["users"],
		queryFn: allUsers,
	});

	const [transferAmount, setTransferAmount] = useState<number | 0>(0);
	const [mistakes, setMistakes] = useState("");
	const [checking, setChecking] = useState(false);

	const checkTransferMoney = z.object({
		amount: z
			.number()
			.min(1, { message: "Please enter a transfer amount greater than 0." })
			.max(9999999, { message: "Transfer amount must be less than 10 million." })
			.refine((val) => val === Math.abs(val), { message: "No negative numbers allowed." })
			.refine((val) => /^\d+$/.test(String(val)), { message: "Only numbers are allowed. No special characters." }),
	});

	const { mutate: sendMoney, isSuccess: isTransferSuccess } = useMutation({
		mutationKey: ["Transfer Funds"],
		mutationFn: () => transferFunds(username, transferAmount),

		onSuccess: () => {
			setTransferAmount(0);
			alert("Transferred hab!b!...");
		},
		onError: () => {
			alert("No Money hab!b!");
		},
	});

	const trySendMoney = () => {
		setMistakes("");
		setChecking(true);
		const found = checkTransferMoney.safeParse({ amount: transferAmount });
		if (!found.success) {
			setMistakes(found.error.errors[0].message);
			setChecking(false);
			return;
		}
		sendMoney();
		setChecking(false);
	};

	useEffect(() => {
		if (isTransferSuccess) {
			// Trigger a refetch of the profile data
			refetchProfile();
		}
	}, [isTransferSuccess, refetchProfile]);

	const [isTransaction, setIsTransactionSelected] = useState(false); // Default to Withdraw

	const handleToggle = (transactionType: any) => {
		if (!isTransaction) {
			setIsTransactionSelected(true);
		} else if (isTransaction) {
			setIsTransactionSelected(false);
		}
	};

	const isSelf = currentUser?.username === username;

	return (
		<View>
			<View style={styles.viewCenter}>
				<Feather name="user" color="black" size={24} />
				<Text style={styles.username}>{username ? username.toUpperCase() : "No Username"}</Text>
				<Text style={styles.balance}>Balance: {balance ? balance.toLocaleString() : "No balance"}</Text>
				<Image
					style={{ borderRadius: 100 }}
					source={{
						uri: image ? image : "",
						height: 100,
						width: 100,
					}}
					resizeMode="contain"
				/>
			</View>
			{!isSelf ? (
				<TouchableOpacity style={styles.submitButton} onPress={handleToggle}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Show Transfer</Text>
				</TouchableOpacity>
			) : (
				""
			)}
			{isTransaction ? (
				<View>
					{!!mistakes && <Text style={{ color: "#d32f2f", marginBottom: 8 }}>{mistakes}</Text>}
					<TextInput
						placeholder="Transfer Amount"
						style={styles.input}
						keyboardType="numeric"
						onChangeText={(number) => {
							if (/^\d*$/.test(number)) setTransferAmount(Number(number));
						}}
						autoCapitalize="none"
						autoCorrect={false}
					/>
					<TouchableOpacity style={styles.submitButton} onPress={trySendMoney} disabled={checking}>
						<Text style={{ color: "white", fontWeight: "bold" }}>{checking ? "Checking..." : "Transfer"}</Text>
					</TouchableOpacity>
				</View>
			) : (
				""
			)}
		</View>
	);
};

export default UserProfileCard;

const PRIMARY_COLOR = "#000042";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const BUTTON_HEIGHT = 40;

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: BORDER_RADIUS,
		backgroundColor: BG_COLOR,
		padding: 20,
		margin: 10,
		width: CONTENT_WIDTH,
	},
	input: {
		borderWidth: 1.5,
		borderColor: BORDER_COLOR,
		borderRadius: BORDER_RADIUS,
		height: 40,
		width: "100%",
		paddingHorizontal: 14,
		fontSize: 16,
		backgroundColor: "#fff",
		marginBottom: 8,
	},
	username: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		alignSelf: "center",
	},
	balance: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		alignSelf: "center",
	},
	textLabel: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		alignSelf: "center",
	},
	image: {
		height: 100,
		width: 100,
		borderRadius: 50,
		marginBottom: 16,
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
		marginTop: 12,
		marginBottom: 10,
		elevation: 2,
	},
});
