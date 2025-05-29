import { deposit, withdraw } from "@/api";
import { me } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { data, refetch: refetchProfile } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});
	const [isWithdrawSelected, setIsWithdrawSelected] = useState(true); // Default to Withdraw

	const toggleSwitch = () => setIsWithdrawSelected((previousState) => !previousState);

	const handleToggle = (transactionType: any) => {
		if (transactionType === "withdraw" && !isWithdrawSelected) {
			setIsWithdrawSelected(true);
		} else if (transactionType === "deposit" && isWithdrawSelected) {
			setIsWithdrawSelected(false);
		}
	};

	const [depositAmount, setDepositAmount] = useState<number | 0>(0);
	const { mutate: depositMutate, isSuccess: isDepositSuccess } = useMutation({
		mutationKey: ["Deposit"],
		mutationFn: () => deposit(depositAmount),

		onSuccess: () => {
			alert("Deposited hab!b!...");
		},
		onError: (error) => {
			alert("No Money hab!b!");
		},
	});

	const handleDeposit = () => {
		depositMutate();
	};

	const [withdrawAmount, setWithdrawAmount] = useState<number | 0>(0);

	const { mutate: withdrawMutate, isSuccess: isWithdrawSuccess } = useMutation({
		mutationKey: ["Withdraw"],
		mutationFn: () => withdraw(withdrawAmount),
		onSuccess: () => {
			alert("Withdrawn hab!b!...");
		},
		onError: (error) => {
			alert("No Money hab!b!");
		},
	});

	const handleWithdraw = () => {
		withdrawMutate();
	};

	useEffect(() => {
		if (isDepositSuccess || isWithdrawSuccess) {
			// Trigger a refetch of the profile data
			refetchProfile();
		}
	}, [isDepositSuccess, isWithdrawSuccess, refetchProfile]);

	return (
		<View style={styles.viewCenter}>
			<View style={styles.balanceCard}>
				<Text style={styles.balanceDetails}> Your Available Balance is : </Text>
				<Text style={styles.balanceDetails}>{data?.balance}</Text>
			</View>

			<View
				style={{
					flexDirection: "row",
					height: "10%",
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#dddddd",
					gap: 40,
					borderRadius: 20,
					margin: 20,
				}}>
				{/* Withdraw Button */}
				<TouchableOpacity onPress={() => handleToggle("withdraw")}>
					<Text>Withdraw</Text>
				</TouchableOpacity>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isWithdrawSelected ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isWithdrawSelected}
				/>
				{/* Deposit Button */}
				<TouchableOpacity onPress={() => handleToggle("deposit")}>
					<Text>Deposit</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.transactionCard}>
				{!isWithdrawSelected ? (
					<View>
						<Text>You have selected Withdraw</Text>
						<TextInput
							placeholder="Withdraw Amount"
							style={styles.input}
							keyboardType="numeric"
							onChangeText={(number) => setWithdrawAmount(Number(number))}
						/>
						<TouchableOpacity onPress={handleWithdraw} style={styles.button}>
							<Text style={{ color: "white", fontWeight: "bold" }}>Withdraw Amount</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<Text>You have selected Deposit</Text>
						<TextInput
							placeholder="Deposit Amount"
							style={styles.input}
							keyboardType="numeric"
							onChangeText={(number) => setDepositAmount(Number(number))}
						/>
						<TouchableOpacity onPress={handleDeposit} style={styles.button}>
							<Text style={{ color: "white", fontWeight: "bold" }}>Deposit Amount</Text>
						</TouchableOpacity>
					</View>
				)}
				{/* You would typically render your Withdraw form/component here
      Or your Deposit form/component here */}
			</View>

			<TouchableOpacity onPress={deleteToken} style={styles.submitButton}>
				<Text style={{ color: "white", fontWeight: "bold" }}>Bye Bye Hab!b!</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},
	balanceCard: {
		height: "20%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#dddddd",
		gap: 10,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24,
	},
	transactionCard: {
		flexDirection: "row",
		height: "40%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#dddddd",
		gap: 30,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24,
	},
	balanceDetails: {
		fontSize: 24,
		fontWeight: "600",
	},
	input: {
		borderWidth: 2,
		width: "100%",

		borderRadius: 20,
		padding: 10,
	},
	inputLabel: {
		alignItems: "flex-start",
		width: "100%",
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
		width: "40%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#000035",
		width: "100%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginTop: 10,
		marginBottom: 10,
	},
});
