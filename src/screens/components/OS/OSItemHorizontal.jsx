import { Platform, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MaterialIcons, Entypo } from '@expo/vector-icons';


const OsItemH = (props) => {
    return (
      <TouchableOpacity style={styles.container}  onPress={props.onPress}>
        
          {/* checkbox component */}
           
            {/* title */}
            <View style={styles.rigth}>
                
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.data}>{props.data}</Text>
            </View>
            <View style={styles.left}>
                <Text style={[styles.status]}>
                {props.status}
                </Text>
               
                <View style={styles.prioridadeColor}>
           
                    <Text style={styles.prioridade}>Alta</Text>
                </View>
            </View>
       
           
        
        </TouchableOpacity>
      )
    
}

export default OsItemH

const styles = StyleSheet.create({
    container:{
        alignSelf: "center",
        backgroundColor: "#10456e",
        width: "90%",
        borderRadius: 10,
        padding: 13,  
        marginTop: '5%',
        height: 90,
        borderWidth: 0.3,
        borderColor: 'red',
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 6,
       
    },
    left: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '50%',
     
    },
    rigth: {
        flexDirection: 'column',
       
        width: '50%',
        justifyContent: 'center',
       
       
      },
    title:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
   
        marginTop: 1,
        marginBottom: 10,
    },
    status:{
      color: "#fff",
        fontSize: 14,
        flex: 1,
        fontWeight: "700",
        textAlign: 'center',
    },
    data:{
      color: "#fff",
        fontSize: 12,
        flex: 1,
        fontWeight: "400",
        marginStart: 5,   
      
    },
    prioridadeColor: {
      backgroundColor: '#C61B11',
      borderWidth: 1,
      borderColor: '#C61B11',
      width: '80%',
      height: 20,
      borderRadius: 10,
      marginBottom: 5,
     
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