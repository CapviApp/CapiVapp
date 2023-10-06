import { Platform, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MaterialIcons, Entypo } from '@expo/vector-icons';


const OSCarrossel = (props) => {
    return (
      <TouchableOpacity style={styles.container}  onPress={props.onPress}>
        
          {/* checkbox component */}
           
            {/* title */}
            <View style={styles.header}>
            <Text style={[styles.status]}>
             {props.status}
            </Text>
            <Entypo name="dots-three-horizontal" size={20} color="white" />
            </View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.data}>{props.data}</Text>
            <View style={styles.prioridadeColor}>
           
              <Text style={styles.prioridade}>Alta</Text>
            </View>
        
        </TouchableOpacity>
      )
    
}

export default OSCarrossel

const styles = StyleSheet.create({
    container:{
        alignSelf: "center",
        backgroundColor: "#10456e",
        width: "17%",
        borderRadius: 10,
        padding: 13,    
        height: '100%',
        borderWidth: 0.3,
        borderBottomWidth: 6,
        borderColor: 'red',
        marginHorizontal: 10,

    },
    header: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    title:{
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
        flex: 1,
        marginTop: 1
    },
    status:{
      color: "#fff",
        fontSize: 12,
        flex: 1,
        fontWeight: "700",
      
    },
    data:{
      color: "#fff",
        fontSize: 12,
        flex: 1,
        fontWeight: "400",
        marginStart: 5,   
        marginTop: -5,
    },
    prioridadeColor: {
      backgroundColor: '#C61B11',
      borderWidth: 1,
      borderColor: '#C61B11',
      width: '100%',
      height: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    prioridade: {
      color: "#fff",
      fontSize: 12,
      flex: 1,
      fontWeight: "700",
      marginStart: 5,   
      textAlign: 'center'
    },
})