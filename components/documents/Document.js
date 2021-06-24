import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Colors from "../../constants/Colors";
import DefaultText from "../UI/DefaultText";
import {createTextPreview} from "../../helpers/createTextPreview";

const DOCUMENT_NAME_LENGTH = 15;

export const Document = ({ name, onRemove }) => {
	return (
		<TouchableWithoutFeedback onPress={onRemove}>
			<View style={styles.documentContainer}>
				<FontAwesome
					name="file-text"
					size={32}
					color={Colors.primary}
					key={name}
				/>
				<DefaultText style={styles.documentTitle}>
					{createTextPreview(name, DOCUMENT_NAME_LENGTH)}
				</DefaultText>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	documentContainer: {
		alignItems: "center",
		paddingHorizontal: 10
	},
	documentTitle: {
		marginTop: 7,
		fontSize: 13
	}
});