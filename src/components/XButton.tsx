import React, { memo } from "react";
import {
	StyleSheet,
	TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { systemWeights } from "react-native-typography";
import {Text, XButton as View} from "../styles/components";

interface XButtonComponent {
	onPress: Function,
	size?: number,
	style?: object
}
const _XButton = ({ onPress = () => null, size = 28, style = {} }: XButtonComponent) => {
	const _onPress = () => onPress();
	return (
		<TouchableOpacity onPress={_onPress} style={[styles.container, { height: size, width: size * 3, ...style }]}>
			<View style={[styles.circle, { height: size, width: size * 3 }]}>
				<Text type="text" style={styles.text}>back</Text>
			</View>
		</TouchableOpacity>
	);
};

_XButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	size: PropTypes.number,
	style: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
	},
	circle: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 6
	},
	text: {
		...systemWeights.regular,
		fontSize: 12,
		textAlign: "center"
	}
});

//ComponentShouldNotUpdate
const XButton = memo(
	_XButton,
	(prevProps, nextProps) => {
		if (!prevProps || !nextProps) return true;
		return prevProps === nextProps;
	}
);

export default XButton;
