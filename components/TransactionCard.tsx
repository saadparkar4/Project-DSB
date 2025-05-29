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

const PRIMARY_COLOR = "#1a237e";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: BG_COLOR,
		borderRadius: BORDER_RADIUS,
		margin: 10,
		padding: 10,
	},
	balance: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		textAlign: "center",
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
