import { me, updateProfile } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserCardProps {
	image: string;
	username: string;
	balance: number;
}

// const transactionDate = new Date().

const ProfileCard = ({ username, image, balance }: UserCardProps) => {
	const { data, refetch: refetchProfile } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});
	const [imageProfile, setImage] = useState<string | null>(null);
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: false,
			aspect: [1, 1],
			quality: 1,
		});
		console.log(result);
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	const { mutate: imageMutate, isSuccess: isUpdateSuccess } = useMutation({
		mutationKey: ["Update Image"],
		mutationFn: () => updateProfile(imageProfile || ""),

		onSuccess: () => {
			alert("Image Updated hab!b!...");
		},
		onError: () => {
			alert("No Money hab!b!");
		},
	});

	const handleUpdateImage = () => {
		imageMutate();
	};

	useEffect(() => {
		if (isUpdateSuccess) {
			// Trigger a refetch of the profile data
			refetchProfile();
		}
	}, [isUpdateSuccess, refetchProfile]);

	const [isImageSelected, setImageIsSelected] = useState(false); // Default to Withdraw

	const handleToggle = (transactionType: any) => {
		if (!isImageSelected) {
			setImageIsSelected(true);
		} else if (isImageSelected) {
			setImageIsSelected(false);
		}
	};

	return (
		<View style={styles.viewCenter}>
			<TouchableOpacity onPress={pickImage} onPressOut={handleToggle}>
				<Image
					style={{ borderRadius: 100 }}
					source={{
						uri: image ? image : "",
						height: 200,
						width: 200,
					}}
				/>
			</TouchableOpacity>
			<View>
				<Text style={styles.username}>{username ? username.toUpperCase() : "No Username"}</Text>
				<Text style={styles.balance}>Balance: {balance ? balance : "No balance"}</Text>

				{isImageSelected ? (
					<Text style={styles.textLabel} onPress={handleUpdateImage}>
						Confirm Upload
					</Text>
				) : (
					""
				)}
				<TouchableOpacity style={styles.submitButton}>
					<Text style={{ color: "white", fontWeight: "bold" }}>save</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProfileCard;

const PRIMARY_COLOR = "#1a237e";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 22;
const BUTTON_HEIGHT = 40;

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: CONTENT_WIDTH,
		backgroundColor: BG_COLOR,
		borderRadius: BORDER_RADIUS,
		padding: 20,
		margin: 10,
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
		height: 120,
		width: 120,
		borderRadius: 60,
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
