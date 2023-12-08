import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions } from 'react-native';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth'
import useAuth from '../../hooks/useAuth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigation();
   
  const handleSubmit = async () => {
   
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log('got error: ', err.message);
      }
   
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../../../assets/background.png')} style={styles.background}>

      <AntDesign style={styles.icon} name="leftcircle" size={30} color="white" onPress={() => navigation.navigate("Welcome")}/>

      <Image source={require('../../../assets/capibara.png')} style={styles.Image}/>
      
      <Text style={styles.title}>CapivApp</Text>
      <Text style={styles.subTitle}>Login</Text>
      <View style={styles.inputContainer}>
      <TextInput 
          style={styles.input} 
          placeholder='Email'  
          placeholderTextColor='#FFF'
          value={email}
          onChangeText={value => setEmail(value)} 
        />
      <TextInput 
          style={styles.input}
          placeholder='Senha'  
          placeholderTextColor='#FFF' 
          secureTextEntry
          value={password} 
          onChangeText={value => setPassword(value)}
      />
      <Text style={styles.esqueceuSenha} onPress={() => navigation.navigate("alterar")}>Esqueceu a senha?</Text>
      </View>
      <Button
        title='Entrar'
        onPress={handleSubmit}
        style={styles.button}
      />
      
      <Text style={styles.Signup} onPress={() => navigation.navigate("signUp")}>Já possui uma conta?</Text>
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
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
    marginTop: 30,
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
    marginTop: -90
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  inputContainer:{
    width: '80%'
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
  },
  Signup: {
    color: 'white',
  },
  background: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
