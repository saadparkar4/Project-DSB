import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TransactionCardProps {
	transaction: {
		amount: number;
		createdAt: string;
		type: string;
	};
	setTransaction: (transaction: any) => void;
	displayTransaction: any;
}

const TransactionCard = ({ transaction, setTransaction, displayTransaction }: TransactionCardProps) => {
	return (
		<View style={styles.viewCenter}>
			<View>
				<Text style={styles.balance}>
					{transaction.amount ? transaction.amount : "0"},{transaction.createdAt ? transaction.createdAt.slice(0, 10) : "No Date"},
					{transaction.type ? transaction.type : "No Type"}
				</Text>
			</View>
		</View>
	);
};

export default TransactionCard;

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		// justifyContent: "center",
		justifyContent: "space-around",
		// alignItems: "space-between",
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
		// width: "30%",
		padding: 10,
		fontWeight: "bold",
		fontSize: 20,
		gap: 40,
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
		backgroundColor: "#000035",
		width: "40%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
});
