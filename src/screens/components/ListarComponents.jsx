import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, Button, StyleSheet, SectionList } from 'react-native';
import { addDoc, collection, query, getDocs, doc, updateDoc, deleteDoc, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { db } from '../../config/firebase';

function Listar({ osList, selecionarOS }) {
  const navigation = useNavigation(); // Move the useNavigation hook inside the function component
  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    setIsLoading(true); // Inicia o carregamento
  
    try {
      const q = query(osCollectionRef, orderBy('timestamp', 'desc'));
      const subscriber = onSnapshot(q, {
          next: (snapshot) => {
            const osData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setOSList(osData);
            setIsLoading(false); // Finaliza o carregamento após os dados serem recebidos
          },
          error: () => {
            console.error('Erro ao listar.');
            setIsLoading(false); // Finaliza o carregamento em caso de erro
          }
        });
  
      return () => subscriber();
    } catch (error) {
      console.error('Erro ao listar:', error);
      setIsLoading(false); // Finaliza o carregamento em caso de erro
    }
  }, []);
  

  const navigateToDetails = (item) => {
    navigation.navigate("os", { osItem: item });
    console.log('id:',item);
  };

  
// mudar cor da prioridade
  const getColorByPriority = (priority) => {
    switch (priority.toLowerCase()) {
      case 'baixa':
        return 'green';
        case 'média' || 'media':
          return '#D59712';
      case 'alta':
        return 'red';
      default:
        return 'gray'; 
    }
  };
  
  return (
    <SectionList
      sections={[{ data: osList }]}
      renderItem={({ item }) => {  
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.container}>
              <View style={styles.containerText}>
                <Text style={styles.text}>status: {item.statusOS}</Text>
                <Text style={styles.text}>Data: {item.data}</Text>
                <Text style={styles.text}>Cliente: {typeof item.cliente === 'object' ? item.cliente.value : item.cliente}</Text>
                <Text style={styles.text}>Prioridade: {item.prioridade}</Text>
                <Text style={[styles.osPriorityText, 
                { backgroundColor: getColorByPriority(item.prioridade) } ]}>Prioridade: {item.prioridade}</Text>
              </View >              
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default Listar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    marginVertical: 7,
    borderRadius: 20,
    flexDirection: 'row',
  },
  containerText: {
    flexDirection: 'column',
  },
  button: {
    marginLeft: 110,
    position: 'fixed',
  },
  text: {
    color: 'white'
  },
  osPriorityText: {
   
   
    marginBottom: 4,
   
    borderRadius: 10,
    paddingLeft: 8,
    color: "#fff"
  }
});