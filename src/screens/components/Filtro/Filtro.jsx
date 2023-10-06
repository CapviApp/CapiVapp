import { Platform, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window')

const Filtro = (props) => {
    return (
      <TouchableOpacity style={styles.container}  onPress={props.onPress}>
            <Entypo name="controller-record" size={24} color="white" style={styles.circle}/>
           <Text style={styles.title}>{props.title}</Text>
           <MaterialIcons name="keyboard-arrow-down" size={24} color="white" style={styles.down}/>
        </TouchableOpacity>
      )
    
}

export default Filtro

const styles = StyleSheet.create({
    container:{
        alignSelf: "center",
        backgroundColor: "#10456e",
        width: "90%",
        borderRadius: 20,
        marginTop: '5%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingStart: '5%',
        alignItems: 'center',
    },
    title:{
        color: "#fff",
        fontSize: 19,
        fontWeight: "400",
        marginTop: 1,
        marginBottom: 10,
        paddingStart: 30,
        marginTop: 5,
    },
    down: {
        marginStart: '90%',
        fontSize: 30,
        position: 'absolute'
    },
    circle: {
        
    },
})