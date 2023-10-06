import React from "react";
import { View,Text, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window')

import OSCarrossel from "./OS";

const CarrosselOS = ({data}) => {
    return (
      <View><OSCarrossel/></View>
    )
}

export default CarrosselOS

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        
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

})