import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs } from "firebase/firestore";

import { db } from'../../config/firebase'

export default function Cliente() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, 'teste');

  const adicionar = async () => {
    try {
      await setDoc(doc(db, 'teste', email), {
        nome: username,
        email: email,
      });
      console.log('Os dados foram adicionados com sucesso.');
    } catch (error) {
      console.log('Erro ao adicionar dados:', error);
    }
  };

   const update = async () => {
    try {
      await updateDoc(doc(db, 'teste', email), {
        nome: username,
      });
      console.log('Os dados foram atualizados com sucesso.');
    } catch (error) {
      console.log('Erro ao atualizar dados:', error);
    }
  };

  const deleteUser = async () => {
    try {
      await deleteDoc(doc(db, 'teste', email));
      console.log('Os dados foram excluídos com sucesso.');
    } catch (error) {
      console.log('Erro ao excluir dados:', error);
    }
  };

  const listUser = async () => {
    try {
      const querySnapshot = await getDocs(userCollectionRef);
      const userList = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userList.push({
          nome: data.nome,
          email: data.email,
        });
      });

      setUsers(userList);
      console.log('Usuários listados:', userList);
    } catch (error) {
      console.log('Erro ao listar usuários:', error);
    }
  };

  useEffect(() => {
    listUser();
  }, []);

  const Listar = () => {
    return (
      <View>
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Nome: {item.nome}</Text>
              <Text>Email: {item.email}</Text>
            </View>
          )}
        />
      </View>
    )
  }

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
  },

});