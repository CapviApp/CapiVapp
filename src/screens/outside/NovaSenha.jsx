import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, Alert } from 'react-native';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

import Checkbox from 'expo-checkbox';

export default function NovaSenha({ navigation }) {

    const [isChecked, setChecked] = useState(false);
    
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../../../assets/background.png')} style={styles.background} >
        <AntDesign 
            style={styles.icon} 
            name="leftcircle" 
            size={30} 
            color="white" 
            onPress={() => navigation.navigate("alterar")}
        />
        <Image 
            source={require('../../../assets/capibara.png')} 
            style={styles.Image}
        />
        <Text 
            style={styles.title}>
                CapiApp
        </Text>
        <ImageBackground source={require('./../../../assets/rectangle.png')} style={styles.rectangle}>
            <Text style={styles.subTitle}>
            Defina sua nova senha
            </Text>
            <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder='Nova Senha'  
                placeholderTextColor='#FFF' 
                secureTextEntry
                
            />
             <TextInput 
                style={styles.input}
                placeholder='Confirmar Senha'  
                placeholderTextColor='#FFF' 
                secureTextEntry
                
            />
            <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}/>
                <Text style={styles.paragraph}>Lembrar Senha</Text>
            </View>
            </View>
            
            <Button
                title='Confirmar'      
                style={styles.button}
                onPress={() => navigation.navigate("login")}
            />
      
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      background: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      rectangle: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
      },
      icon: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginHorizontal: '5%',
        marginTop: 40,
      },
      Image: {
        width: 250,
        height: 250,
      },
      title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 40,
       marginTop: -90,
      },
      subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
       
      },
      text: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: -15,
      },
      inputContainer:{
        width: '80%',
        marginTop: 30,
      },
      input:{
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingStart: 24,
        color: 'white',
        marginBottom: 20,
      },
      esqueceuSenha: {
        color: 'white',
        fontSize: 14,
        marginTop: -15,
        marginBottom: 20,
        paddingStart: 20,
      },
      button:{
        width: '80%',
        marginBottom: 14,
        marginTop: 20,
      },
      Signup: {
        color: 'white',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -20,
        marginStart: 15,
      },
      paragraph: {
        fontSize: 13,
        color: '#FFF'
      },
      checkbox: {
        margin: 8,
        color: '#FFF',
      },
    });
    