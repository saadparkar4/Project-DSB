import { allUsers, me, transferFunds } from "@/api/auth";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
	const { mutate: transferMutate, isSuccess: isDepositSuccess } = useMutation({
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

	const handleTransfer = () => {
		transferMutate();
	};

	useEffect(() => {
		if (isDepositSuccess) {
			// Trigger a refetch of the profile data
			refetchProfile();
		}
	}, [isDepositSuccess, refetchProfile]);

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
				<Text style={styles.balance}>Balance: {balance ? balance : "No balance"}</Text>
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
					<TextInput
						placeholder="Transfer Amount"
						style={styles.input}
						keyboardType="numeric"
						onChangeText={(number) => setTransferAmount(Number(number))}
					/>
					<TouchableOpacity style={styles.submitButton} onPress={handleTransfer}>
						<Text style={{ color: "white", fontWeight: "bold" }}>Transfer</Text>
					</TouchableOpacity>
				</View>
			) : (
				""
			)}
		</View>
	);
};

export default UserProfileCard;

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		borderRadius: 20,
		backgroundColor: "#ddd",
		padding: 20,
		margin: 10,
	},
	input: {
		borderWidth: 2,
		width: "60%",
		borderRadius: 20,
		padding: 10,
	},
	username: {
		padding: 10,
		fontWeight: "bold",
		fontSize: 20,
	},
	balance: {
		padding: 10,
		fontWeight: "bold",
		fontSize: 20,
	},
	textLabel: {
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
		backgroundColor: "green",
		width: "100%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
});
