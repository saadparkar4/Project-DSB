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
		<View style={styles.row}>
			<Text style={[styles.cell, styles.amountCell]} numberOfLines={2} ellipsizeMode="tail">
				{transaction.amount ? transaction.amount.toLocaleString() : "0"}
			</Text>
			<Text style={styles.cell}>{transaction.createdAt ? transaction.createdAt.slice(0, 10) : "No Date"}</Text>
			<Text style={styles.cell}>{transaction.type ? transaction.type : "No Type"}</Text>
		</View>
	);
};

export default TransactionCard;

const PRIMARY_COLOR = "#000042";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: BG_COLOR,
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		paddingVertical: 8,
		paddingHorizontal: 4,
	},
	cell: {
		flex: 1,
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		textAlign: "center",
	},
	amountCell: {
		flexWrap: "wrap",
		maxWidth: 120,
	},
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
