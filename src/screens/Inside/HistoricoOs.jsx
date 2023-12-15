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
  const osCollectionRef = collection(db, 'Ordem de Serviço');
  
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

  const filteredOS = osList.filter(os => {
    const searchLower = searchQuery.toLowerCase();
    const emailMatch = os.cliente && os.cliente.email && os.cliente.email.toLowerCase().includes(searchLower);
    const prioridadeMatch = os.prioridade && os.prioridade.toLowerCase().includes(searchLower);
    return emailMatch || prioridadeMatch;
  });
//teste
  useEffect(() => {
    setNotFound(searchQuery.length > 0 && filteredOS.length === 0);
  }, [searchQuery, filteredOS]);

  useEffect(() => {
    loadOS();
  }, []);

  const renderItem = ({ item }) => (
    <View>


    </View>
  );

  return (
    <View style={styles.container}>
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
        <Text style={styles.titulo}>Histórico OS</Text>
        <Searchbar placeholder="Pesquisar"onChangeText={onChangeSearch} value={searchQuery}style={styles.searchbar}/>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : notFound ? (
          <Text style={styles.notFoundText}>Não foi encontrado</Text>
        ) : (
          <FlatList
            data={filteredOS}
            renderItem={renderItem}
            keyExtractor={(item) => item.email }
            ListHeaderComponent={searchQuery.length === 0 && !notFound ? () => (
              <Text style={styles.subtitulo}>Ordens de Serviço:</Text>
            ) : null}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
        <Listar osList={osList} />
    </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center', 
    textAlign: 'center',
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 30,
  },
  subtitulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },

  backgroundColor: {
    flex: 1,
    width: '100%',
  },
  notFoundText: {
    color: 'red', 
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  

});