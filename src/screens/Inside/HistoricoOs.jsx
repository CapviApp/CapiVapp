import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList,  FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper';
import { addDoc, collection, query, getDocs, onSnapshot, doc } from 'firebase/firestore';
import Listar from '../components/ListarComponents';
import { db } from '../../config/firebase';

export default function Historico({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [osList, setOSList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const osCollectionRef = collection(db, 'teste');
  
  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const loadOS = async () => {
    try {
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
      });
     
      setOSList(osData);
      return osData;
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    }
  };

  // Dados de exemplo para as seções
  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];
  
  const listOS = async () => {
    setIsLoading(true);
    try {
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
      });
      setOSList(osData);
    } catch (error) {
      console.error('Erro ao listar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setNotFound(searchQuery.length > 0 && filteredClientes.length === 0);
  }, [searchQuery, filteredClientes]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.id}</Text> {/* Garante que todo texto esteja dentro de <Text> */}
    </View>
  );

  useEffect(() => {
    listOS();
  }, []);



  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
      <View style={styles.container}>
        <Text style={styles.title}>Histórico OS</Text>
        <Searchbar
          placeholder="Buscar Cliente"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : notFound ? (
          <Text style={styles.notFoundText}>Não foi encontrado</Text> 
        ) : (
          <FlatList
            data={filteredOS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        <Text style={styles.subTitle}>Ordens de Serviço</Text>
        <Listar osList={osList} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    marginBottom: '23%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingStart: 22,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    padding: 5,
    paddingStart: 20,
    marginVertical: 10,
  },
  backgroundColor: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    width: '90%',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});