import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CardProps {
	cardTitle: string;
}
const CategoryCard = ({ cardTitle }: CardProps) => {
	return (
		<View
			style={{
				width: 100,
				height: 100,
				backgroundColor: "purple",
				borderRadius: 10,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Text
				style={{
					color: "white",
					fontWeight: "bold",
				}}>
				{cardTitle}
			</Text>
		</View>
	);
};

export default CategoryCard;

const styles = StyleSheet.create({});
