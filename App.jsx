import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text, StatusBar, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import StackRoutes from './src/routes/stack.routes';
import { Login, Welcome, SignUp, AlterarSenha, NovaSenha } from './src/screens/outside';

import { auth } from './src/config/firebase';
import useAuth from './src/hooks/useAuth';
const Stack = createNativeStackNavigator()

export default function App() {

  const {user} = useAuth();
  //const user = false 

<<<<<<< HEAD
  if(user) {
    return (
      <StackRoutes />
    )
  } else {
=======

  if(user) {
    return <StackRoutes/>
  }else {
>>>>>>> 4c98ce2cb32297b03f82a4f2f7cc3b445fcb426a
    return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='welcome'>
        <Stack.Screen name='welcome' component={Welcome} />
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='signUp' component={SignUp} />
        <Stack.Screen name='alterar' component={AlterarSenha} />
        <Stack.Screen name='novaSenha' component={NovaSenha} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

<<<<<<< HEAD

=======
 
>>>>>>> 4c98ce2cb32297b03f82a4f2f7cc3b445fcb426a

}
