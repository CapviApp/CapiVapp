import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from'../../config/firebase'
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import User from '../../../assets/index'


export default function Profile() {


  return (

    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
    
      <View style={styles.container}>
          <Text style={styles.title}>Perfil</Text>
          <View style={styles.image}>
            <Image 
              source={User} 
              style={{
              height: 130,
              width: 130,
              borderRadius: 65,                
              }}/>
          </View>
          <Text style={styles.title}>Lara</Text>
          <Text style={styles.subTitle}>lara.vic@gmail.com</Text>
          <Text style={styles.title}>CPF</Text>
          <Text style={styles.subTitle}>123.456.789-71</Text>
          <Text style={styles.title}>Telefone</Text>
          <Text style={styles.subTitle}>45 9 9123-4567</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}> 
              <AntDesign name="logout" size={20} color="white" style={styles.textButton}/> 
              <Text style={styles.text}>Desconectar</Text>     
            </TouchableOpacity>
         
          
          </View>
      </View>
     
    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    marginBottom: '25%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
   
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    padding: 5,
   
    textAlign: 'center'
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
    justifyContent: 'center',
    
  },
  button: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '80%',
    height: 57,
    borderRadius: 40,
    flexDirection: 'row',
    color: 'blue',
    backgroundColor: '#1D55A8',
    borderWidth: 1,
    borderColor: 'red',
    borderBottomWidth: 4,
    fontSize: 20,
    paddingTop: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingStart: 5,
    textAlign: 'center'
  },
  image: {
    
  },

})