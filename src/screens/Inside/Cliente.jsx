import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from'../../config/firebase'
import { Button } from 'react-native-paper';




export default function Cliente() {


  console.log('tela cliente');
  return (
    

    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
    
      <View style={styles.container}>
       
      </View>
     
    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  flatList: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    marginBottom: '17%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    paddingStart: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    paddingStart: 20,
  },
  backgroundColor: {
    flex: 1,
    width: '100%',
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    color: 'white',
    height: 30,
    width: '90%',
    paddingStart: 20,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    width: '80%',
    height: 47,
    borderRadius: 40,
    marginBottom: 10,
  },


})