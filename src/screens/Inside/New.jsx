import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from'../../config/firebase'
import { Button } from 'react-native-paper';


export default function New() {
  const [formData, setFormData] = useState({
    prioridade: '',
    status: '',
    hardware: '',
    servico: '',
    descricao: '',
    comentarios: '',
    cliente: '',
    data: '',
  });

  const osCollectionRef = collection(db, 'os');
  const [OS, setOS] = useState([]);
  const [docIdToBeUpdated, setDocIdToBeUpdated] = useState('');

  const docRef = addDoc(osCollectionRef, formData);
  let idRef = docRef.id
  const adicionar = async () => {
    try {
     
      console.log('OS dados foram adicionados com sucesso, id: ');
     
      console.log('este e um id',idRef);
     
    } catch (error) {
      console.log('Erro ao adicionar dados:', error);
    }
  }

  const deleteOS = async (docId) => {
    if (docId) {
      try {
        const docRef = doc(db, 'os', docId); // Certifique-se de que 'os' é o nome correto da coleção
        await deleteDoc(docRef);
        console.log('Documento excluído com sucesso.');
        // Você pode adicionar aqui a lógica para atualizar a lista de documentos após a exclusão, se necessário.
      } catch (error) {
        console.error('Erro ao excluir OS:', error);
      }
    } else {
      console.error('Nenhum ID de documento fornecido para exclusão.');
    }
  }

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
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder='ID'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, id: value })}
            value={formData.id}
          >{formData.id}</TextInput>
          <TextInput
            style={styles.input}
            placeholder='Hardware'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, hardware: value })}
            value={formData.hardware}
          />
          <TextInput
            style={styles.input}
            placeholder='Serviço'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, servico: value })}
            value={formData.servico}
          />
          <TextInput
            style={styles.input}
            placeholder='Prioridade'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, prioridade: value })}
            value={formData.prioridade}
          />
          <TextInput
            style={styles.input}
            placeholder='Status'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, status: value })}
            value={formData.status}
          />
          <TextInput
            style={styles.input}
            placeholder='Cliente'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, cliente: value })}
            value={formData.cliente}
          />
          <TextInput
            style={styles.input}
            placeholder='Data'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, data: value })}
            value={formData.data}
          />
          <TextInput
            style={styles.input}
            placeholder='Descrição'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, descricao: value })}
            value={formData.descricao}
          />
          <TextInput
            style={styles.input}
            placeholder='Comentários'
            placeholderTextColor='#fff'
            onChangeText={(value) => setFormData({ ...formData, comentarios: value })}
            value={formData.comentarios}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button mode='contained' onPress={adicionar} style={styles.button}>Adicionar</Button>
          <Button mode='contained' style={styles.button}>Atualizar</Button>
          <Button mode='contained' onPress={() => deleteOS(docIdToBeUpdated)}  style={styles.button}>Excluir</Button>
          <Button mode='contained'  style={styles.button}>Listar</Button>
        </View>
      
      </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  flatList: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    marginBottom: '17%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    paddingStart: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    paddingStart: 20,
  },
  backgroundColor: {
    flex: 1,
    widht: '100%',
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    color: 'white',
    height: 47,
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
  },
  button: {
    width: '80%',
    height: 47,
    borderRadius: 40,
    marginBottom: 10,
  },

})