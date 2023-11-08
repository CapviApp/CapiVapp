import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'; // Importe FlatList
import { doc, setDoc, collection, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import firebase, { db } from '../../config/firebase';
import { useState, useEffect } from 'react';

export default function NewOS() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const userCollectionRef = collection(db, 'teste');

  const adicionar = async () => {
    try {
      await setDoc(doc(userCollectionRef, email), {
        nome: username,
        email: email,
      });
      console.log('Cadastro realizado com sucesso!');
      limparCampos();
      loadUsers(); // Atualize a lista de usuários após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  }

  const update = async () => {
    try {
      await updateDoc(doc(userCollectionRef, email), {
        nome: username,
      });
      console.log('Atualização realizada com sucesso!');
      limparCampos();
      setEditMode(false);
      loadUsers(); // Atualize a lista de usuários após a atualização
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  }

  const deleteUser = async () => {
    try {
      await deleteDoc(doc(userCollectionRef, email));
      console.log('Usuário deletado com sucesso!');
      limparCampos();
      loadUsers(); // Atualize a lista de usuários após a exclusão
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  }

  const listUser = async () => {
    try {
      const q = query(userCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      setUsers(userData);
    } catch (error) {
      console.error('Erro ao listar:', error);
    }
  }

  const loadUsers = async () => {
    try {
      const q = query(userCollectionRef);
      const querySnapshot = await getDocs(q);
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      setUsers(userData);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  const limparCampos = () => {
    setName('');
    setEmail('');
  }

  useEffect(() => {
    loadUsers(); // Carregue a lista de usuários ao iniciar o componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewOS</Text>
      <TextInput placeholder='Nome' onChangeText={(value) => setName(value)} value={username} />
      <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} value={email} />

      {editMode ? (
        <Button onPress={update} title='Atualizar' />
      ) : (
        <Button onPress={adicionar} title='Salvar' />
      )}

      <Button onPress={deleteUser} title='Deletar' />

      {editMode ? (
        <Button onPress={() => { limparCampos(); setEditMode(false); }} title='Cancelar' />
      ) : (
        <Button onPress={() => setEditMode(true)} title='Editar' />
      )}

      <Button onPress={loadUsers} title='Listar' />


      <Text style={styles.listTitle}>Lista de Usuários:</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{`Nome: ${item.nome}, Email: ${item.email}`}</Text>
        )}
      />
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
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
