import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
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
//teste
  const osCollectionRef = collection(db, 'Ordem de Serviço');
  const [OS, setOS] = useState([]);
  const [docIdToBeUpdated, setDocIdToBeUpdated] = useState(null);
 
  const adicionar = async () => {
    try {
      const docRef = await addDoc(osCollectionRef, formData);
      console.log('OS dados foram adicionados com sucesso, id: ', docRef.id);

      const newOS = {
        id: docRef.id,
        ...formData,
      };

      setOS([...OS, newOS]);

      console.log('este é um id', docRef.id);

      // Limpar o formulário após a adição
      setFormData({
        prioridade: '',
        status: '',
        hardware: '',
        servico: '',
        descricao: '',
        comentarios: '',
        cliente: '',
        data: '',
      });
    } catch (error) {
      console.log('Erro ao adicionar dados:', error);
    }
  }
  
  const update = async (id) => {
    if(id){
      try {
        const docRef = doc(osCollectionRef, id);
        const updateData = {
        prioridade: formData.prioridade,
        status: formData.status,
        hardware: formData.hardware,
        servico: formData.servico,
        descricao: formData.descricao,
        comentarios: formData.comentarios,
        cliente: formData.cliente,
        data: formData.data,
      };
      await updateDoc(docRef, updateData);
      console.log('Os dados da OS foram atualizados com sucesso.');
      }catch (error) {
        console.log('Erro ao atualizar os dados:', error);
      }
    }else {
      console.log('Nenhum ID de documento válido para o update.');
    }
  }
  const ListOS = async () => {
    try {
      const querySnapshot = await getDocs(osCollectionRef);
      const osList = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        osList.push({
          id: doc.id,
          cliente: data.cliente,
          prioridade: data.prioridade,
          status: data.status,
          hardware: data.hardware,
          servico: data.servico,
          descricao: data.descricao,
          comentarios: data.comentarios,
        });
      });
      setOS(osList);
      console.log('OS listadas: ', osList);
    } catch (error) {
      console.log('Erro ao listar os:', error);
    }
  }

  const preencherFormulario = (item) => {
    setDocIdToBeUpdated(item.id); // Defina o ID do documento a ser atualizado
    setFormData({
      prioridade: item.prioridade,
      status: item.status,
      hardware: item.hardware,
      servico: item.servico,
      descricao: item.descricao,
      comentarios: item.comentarios,
      cliente: item.cliente,
      data: item.data,
    });
  }

  function Listar() {
    return (
      <FlatList
        data={OS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
          <TouchableOpacity onPress={() => preencherFormulario(item)} style={styles.formOS}>
            
              <Text style={styles.subTitle}>ID: {item.id}</Text>
              <Text style={styles.subTitle}>Hardware: {item.hardware}</Text>
              <TextInput
              style={styles.input}
              placeholder='Hardware'
              placeholderTextColor='#fff'
              onChangeText={(value) => setFormData({ ...formData, hardware: value })}
              value={formData.hardware}
            />
              <View style={styles.buttonContainer}>
              <Button mode='contained' onPress={() => cancelaroperacao(item.id)}>Cancelar</Button>

              <Button mode='contained' onPress={() => update(item.id)}>Atualizar</Button>
              </View>
            
          </TouchableOpacity>
          </View>
        )}
      />
    )
  }

  return (

    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
     
      <View style={styles.container}>
        <Text style={styles.title}> CRUD OS </Text>
        <View style={styles.inputContainer}>
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
          <Button mode='contained' onPress={adicionar} >Adicionar</Button>
        
        
          <Button mode='contained' onPress={ListOS} >Listar</Button>
        </View>
        <Listar/>
      </View>
     
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

  },
  subTitle: {
    fontSize: 12,
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
    height: 20,
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
    flexDirection: 'row',
  },
  button: {
    width: '80%',
    height: 47,
    borderRadius: 40,
    marginBottom: 10,
  },
  formOS: {
    borderColor: 'red',
    borderWidth: 1,
  },
})