import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from'../../config/firebase'
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import User from '../../../assets/index'
import { getAuth, signOut } from 'firebase/auth';
import { auth, firebase } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native';
import { Welcome } from '../outside/Welcome';
import useAuth from '../../hooks/useAuth';


export default function Profile({ navigation }) {
  const { user } = useAuth();

  const Signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('usuario deslogado');
    }).catch((error) => {
      console.log('erro ao deslogar');
    });

  }
  if (!user) {
    return <Text>Usuário não está logado</Text>;
  }
  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.imageContainer}>
          <Image 
            source={user?.photoURL ? { uri: user.photoURL } : require('../../../assets/user.jpeg')} 
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.title}>{user?.displayName || 'Nome Indisponível'}</Text>
        <Text style={styles.subTitle}>{user?.email || 'E-mail Indisponível'}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={Signout}> 
            <AntDesign name="logout" size={20} color="white" />
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
    marginBottom: '25%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom:50,
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    padding: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  backgroundColor: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center', // Centraliza horizontalmente
    marginBottom: 10,
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
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
    backgroundColor: '#1D55A8',
    borderWidth: 1,
    borderColor: 'red',
    borderBottomWidth: 4,
    fontSize: 20,
    paddingTop: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingStart: 5,
    textAlign: 'center',
  },
});