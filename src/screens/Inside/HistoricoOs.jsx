import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import Listar from '../components/ListarComponents';
import { db } from '../../config/firebase';



export default function Historico({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [osList, setOSList] = useState([]);

  // Dados de exemplo para as seções
  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];
  const osCollectionRef = collection(db, 'teste');
  
  const listOS = async () => {
    try {
      //const selectedValue = selected; 
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      
  
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
        console.log('OS, id:', doc.id);
      });
      
      setOSList(osData);
    } catch (error) {
      console.error('Erro ao listar:', error);
    }
  };


 
  const renderItem = ({ item }) => (
    <View>
    
      <Text>{item}</Text>
    </View>
  );

  useEffect(() => {
    listOS();
  }, []);


  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
     
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.container}>
          <Text style={styles.title}>Histórico OS</Text>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Busca Histórico"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar}
            />
          </View>
          <Text style={styles.subtitulo}>Ordens de Serviço</Text>
          <Listar osList={osList}/>
        </View>
        
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </LinearGradient>
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
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center', 
    textAlign: 'center',
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
    marginVertical: 30,
  },
  subtitulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    marginLeft: 30,
  },
});