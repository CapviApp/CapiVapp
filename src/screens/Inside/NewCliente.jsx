import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SectionList } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import firebase, { db } from '../../config/firebase';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

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
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userList);
      console.log('Clientes listados:', userList);
    } catch (error) {
      console.log(error);
    }
  };

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

  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];

  // Função para renderizar um item individual na SectionList
  const renderItem = ({ item }) => (
    <View>
      {/* Seu componente de item da lista (OsItemH) */}
      <Text>{item}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
     
    <SectionList
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
       
        <View>
          <View style={styles.inputContainer}>
          <Text style={styles.title}>Novo Cliente</Text>
            <TextInput placeholder="Nome:" onChangeText={(value) => setUsername(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="Email:" onChangeText={(value) => setEmail(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="CNPJ/CPF:" onChangeText={(value) => setCpfCnpj(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="Telefone:" onChangeText={(value) => setTelefone(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="Endereço:" onChangeText={(value) => setEndereco(value)} style={styles.input} placeholderTextColor={color='white'}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={adicionar} mode='contained' style={styles.button}>Salvar</Button>
            
          </View>
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
      
      )}
      keyExtractor={(item, index) => index.toString()}
    />
   </LinearGradient>
  );
}



const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  button:{
    marginBottom: 10,
    paddingVertical: 6,
    borderRadius: 30,
   
  },
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    marginVertical: 10,
    paddingStart: 10,
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#1A4963'
    
  },
  inputContainer: {
    paddingHorizontal: 15,
  }
});