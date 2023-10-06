import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/color';

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const textColor = props.filled ? COLORS.white : COLORS.white;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={styles.title}>{props.title}</Text>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
})
export default Button