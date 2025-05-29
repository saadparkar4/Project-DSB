import { allUsers } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import React from "react";

import UserProfileCard from "@/components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const PRIMARY_COLOR = "#1a237e";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

export default function Index() {
	const { data } = useQuery({
		queryKey: ["users"],
		queryFn: allUsers,
	});

	return (
		<ScrollView style={styles.viewCenter}>
			{data?.map((users: any) => (
				<UserProfileCard key={users._id} username={users?.username} image={users?.imageNotNeeded} balance={users?.balance} />
			))}
			<TouchableOpacity onPress={deleteToken} style={styles.submitButton}>
				<Text style={{ color: "white", fontWeight: "bold" }}>Bye Bye Hab!b!</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		backgroundColor: BG_COLOR,
		paddingHorizontal: 16,
		width: CONTENT_WIDTH,
		alignSelf: "center",
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
});
