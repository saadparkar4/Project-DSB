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

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: 800,
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
