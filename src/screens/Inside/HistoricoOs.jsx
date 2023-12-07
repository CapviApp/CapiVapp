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
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar}
            />
          </View>
          <Text style={styles.subTitle}>Ordens de Serviço</Text>
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