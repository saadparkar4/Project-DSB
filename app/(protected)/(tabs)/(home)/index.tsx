import { deposit, withdraw } from "@/api";
import { me } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const PRIMARY_COLOR = "#000042";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

export default function Index() {
	const { data, refetch: refetchProfile } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});
	const [isWithdrawSelected, setIsWithdrawSelected] = useState(true); // Default to Withdraw
	const [mistakes, setMistakes] = useState("");
	const [checking, setChecking] = useState(false);
	const toggleSwitch = () => setIsWithdrawSelected((previousState) => !previousState);

	const handleToggle = (transactionType: any) => {
		if (transactionType === "withdraw" && !isWithdrawSelected) {
			setIsWithdrawSelected(true);
		} else if (transactionType === "deposit" && isWithdrawSelected) {
			setIsWithdrawSelected(false);
		}
	};

	const [depositAmount, setDepositAmount] = useState<number | 0>(0);
	const [withdrawAmount, setWithdrawAmount] = useState<number | 0>(0);

	const checkDepositMoney = z.object({
		amount: z
			.number()
			.min(1, { message: "Please enter a deposit amount greater than 0." })
			.max(9999999, { message: "Deposit amount must be less than 10 million." })
			.refine((val) => val === Math.abs(val), { message: "No negative numbers allowed." })
			.refine((val) => /^\d+$/.test(String(val)), { message: "Only numbers are allowed. No special characters." }),
	});
	const checkWithdrawMoney = z.object({
		amount: z
			.number()
			.min(1, { message: "Please enter a withdraw amount greater than 0." })
			.max(9999999, { message: "Withdraw amount must be less than 10 million." })
			.refine((val) => val === Math.abs(val), { message: "No negative numbers allowed." })
			.refine((val) => /^\d+$/.test(String(val)), { message: "Only numbers are allowed. No special characters." }),
	});

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

	const tryDeposit = () => {
		setMistakes("");
		setChecking(true);
		const found = checkDepositMoney.safeParse({ amount: depositAmount });
		if (!found.success) {
			setMistakes(found.error.errors[0].message);
			setChecking(false);
			return;
		}
		depositMutate();
		setChecking(false);
	};

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

	const tryWithdraw = () => {
		setMistakes("");
		setChecking(true);
		const found = checkWithdrawMoney.safeParse({ amount: withdrawAmount });
		if (!found.success) {
			setMistakes(found.error.errors[0].message);
			setChecking(false);
			return;
		}
		withdrawMutate();
		setChecking(false);
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
				<Text style={styles.balanceTitle}>Your Available Balance</Text>
				<Text style={styles.balanceAmount}>
					{data?.balance?.toLocaleString()} <Text style={styles.currency}>KWD</Text>
				</Text>
			</View>

			<View style={styles.toggleRow}>
				<TouchableOpacity
					onPress={() => handleToggle("withdraw")}
					style={[styles.toggleButton, !isWithdrawSelected && styles.toggleButtonActive]}
					activeOpacity={0.8}>
					<Text style={[styles.toggleButtonText, !isWithdrawSelected && styles.toggleButtonTextActive]}>Withdraw</Text>
				</TouchableOpacity>
				<Switch
					trackColor={{ false: "#b0b0b0", true: "#81b0ff" }}
					thumbColor={isWithdrawSelected ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isWithdrawSelected}
					style={{ marginHorizontal: 8 }}
				/>
				<TouchableOpacity
					onPress={() => handleToggle("deposit")}
					style={[styles.toggleButton, isWithdrawSelected && styles.toggleButtonActive]}
					activeOpacity={0.8}>
					<Text style={[styles.toggleButtonText, isWithdrawSelected && styles.toggleButtonTextActive]}>Deposit</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.transactionCard}>
				{isWithdrawSelected ? (
					<View style={styles.formContainer}>
						<Text style={styles.formTitle}>Withdraw Funds</Text>
						<Text style={{ color: "#d32f2f", marginBottom: mistakes ? 8 : 0 }}>{mistakes}</Text>
						<TextInput
							placeholder="Withdraw Amount"
							style={styles.input}
							keyboardType="numeric"
							onChangeText={(number) => {
								if (/^\d*$/.test(number)) setWithdrawAmount(Number(number));
							}}
							autoCapitalize="none"
							autoCorrect={false}
							placeholderTextColor="#aaa"
						/>
						<TouchableOpacity onPress={tryWithdraw} style={styles.button} activeOpacity={0.85} disabled={checking}>
							<Text style={styles.buttonText}>{checking ? "Checking..." : "Withdraw"}</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.formContainer}>
						<Text style={styles.formTitle}>Deposit Funds</Text>
						<Text style={{ color: "#d32f2f", marginBottom: mistakes ? 8 : 0 }}>{mistakes}</Text>
						<TextInput
							placeholder="Deposit Amount"
							style={styles.input}
							keyboardType="numeric"
							onChangeText={(number) => {
								if (/^\d*$/.test(number)) setDepositAmount(Number(number));
							}}
							autoCapitalize="none"
							autoCorrect={false}
							placeholderTextColor="#aaa"
						/>
						<TouchableOpacity onPress={tryDeposit} style={styles.button} activeOpacity={0.85} disabled={checking}>
							<Text style={styles.buttonText}>{checking ? "Checking..." : "Deposit"}</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
		backgroundColor: BG_COLOR,
		paddingHorizontal: 16,
		width: CONTENT_WIDTH,
		alignSelf: "center",
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
	balanceTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: PRIMARY_COLOR,
		marginBottom: 2,
		letterSpacing: 0.5,
	},
	balanceAmount: {
		fontSize: 32,
		fontWeight: "bold",
		color: PRIMARY_COLOR,
		marginBottom: 2,
	},
	currency: {
		fontSize: 18,
		color: "#888",
		fontWeight: "500",
	},
	toggleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f0f2fa",
		borderRadius: 16,
		marginVertical: 18,
		paddingVertical: 8,
		paddingHorizontal: 12,
		gap: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 2,
	},
	toggleButton: {
		paddingVertical: 8,
		paddingHorizontal: 18,
		borderRadius: 12,
		backgroundColor: "#e3e7f7",
	},
	toggleButtonActive: {
		backgroundColor: PRIMARY_COLOR,
	},
	toggleButtonText: {
		color: PRIMARY_COLOR,
		fontWeight: "600",
		fontSize: 16,
		letterSpacing: 0.2,
	},
	toggleButtonTextActive: {
		color: "#fff",
	},
	formContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		padding: 16,
	},
	formTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: PRIMARY_COLOR,
		marginBottom: 12,
		letterSpacing: 0.5,
	},
	input: {
		borderWidth: 1.5,
		borderColor: BORDER_COLOR,
		borderRadius: BORDER_RADIUS,
		height: 48,
		width: "100%",
		paddingHorizontal: 14,
		fontSize: 16,
		backgroundColor: "#fff",
		marginBottom: 8,
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
		width: "100%",
		borderRadius: BORDER_RADIUS,
		padding: 10,
		alignItems: "center",
		marginTop: 10,
		marginBottom: 10,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
		letterSpacing: 0.5,
	},
});
