import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
export default function Cliente() {
  
  return (
    <View style={styles.container}>

    <TextInput
      style={styles.input}
      placeholder='Nome'
      onChangeText={(value) => setUsername(value)}
      value={username}
    />
    <TextInput
      style={styles.input}
      placeholder='Email'
      onChangeText={(value) => setEmail(value)}
      value={email}
    />
    <Button onPress={adicionar} title='Adicionar'/>
    <Button onPress={update} title='Atualizar'/>
    <Button onPress={deleteUser} title='Excluir'/>
    <Button onPress={listUser} title='Listar'/>
    <View>
      <Text>Lista de Usuários</Text>
      <Listar/>
    </View>
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  }
});
