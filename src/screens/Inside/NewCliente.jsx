import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import firebase, { db } from '../../config/firebase';


export default function Cliente() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, 'Cliente teste');

  const adicionar = () => {
    try {
      setDoc(doc(userCollectionRef, email), {
        nome: username,
        email: email,
        cpf: cpfCnpj,
        cnpj: cpfCnpj,
        telefone: telefone,
        endereco: endereco,
      }).then(() => {
        console.log('Cliente adicionado');
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const listUser = async () => {
    try {
      const querySnapshot = await getDocs(userCollectionRef);
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push(doc.data());
      });
      setUsers(userList);
      console.log('Clientes listados:', userList);
    } catch (error) {
      console.log(error);
    }
  }

  const update = async () => {
    try {
      const userDoc = await getDoc(doc(userCollectionRef, email));
      if (userDoc.exists()) {
        updateDoc(doc(userCollectionRef, email), {
          nome: username,
          cpf: cpfCnpj,
          cnpj: cpfCnpj,
          telefone: telefone,
          endereco: endereco,
        }).then(() => {
          console.log('Cliente atualizado');
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log('Documento não encontrado para atualização');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  const deleteUser = () => {
    try {
      deleteDoc(doc(userCollectionRef, email)).then(() => {
        console.log('Cliente excluído');
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View>
      <Text>Novos Cliente</Text>
      <TextInput placeholder="Nome:" onChangeText={(value) => setUsername(value)} />
      <TextInput placeholder="Email:" onChangeText={(value) => setEmail(value)} />
      <TextInput placeholder="CNPJ/CPF:" onChangeText={(value) => setCpfCnpj(value)} />
      <TextInput placeholder="Telefone:" onChangeText={(value) => setTelefone(value)} />
      <TextInput placeholder="Endereço:" onChangeText={(value) => setEndereco(value)} />
      <Button onPress={adicionar} title="Novo" />
      <Button onPress={update} title="Editar" />
      <Button onPress={deleteUser} title="Excluir" />
      <Button onPress={listUser} title="Listar" />

      {users.map((user, index) => (
        <View key={index}>
          <Text>Nome: {user.nome}</Text>
          <Text>Email: {user.email}</Text>
          <Text>CNPJ/CPF: {user.cnpj || user.cpf}</Text>
          <Text>Número de Telefone: {user.telefone}</Text>
          <Text>Endereço: {user.endereco}</Text>
        </View>
      ))}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});