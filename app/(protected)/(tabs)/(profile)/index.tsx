import { me } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import ProfileCard from "@/components/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { data } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});

	return (
		<View style={styles.viewCenter}>
			<ProfileCard username={data?.username} image={data?.image} balance={data?.balance} />

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
