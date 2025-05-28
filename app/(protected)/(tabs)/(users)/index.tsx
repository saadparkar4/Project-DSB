import { allUsers } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import React from "react";

import UserProfileCard from "@/components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

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
		backgroundColor: "#000035",
		width: "40%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
});
