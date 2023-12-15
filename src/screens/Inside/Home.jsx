import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SectionList, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {  Feather, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign} from '@expo/vector-icons'
import { Searchbar } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Prioridade from './Prioridade';
import ListaHorizontal from '../../components/layout/ListaHorizontal/ListaHorizontal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addDoc, collection, query, getDocs, orderBy} from 'firebase/firestore';
import { db } from '../../config/firebase';
import Listar from '../components/ListarComponents';

export default function Home() {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [osList, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'Ordem de Serviço');
  
  const onChangeSearch = query => setSearchQuery(query);
//teste
  const listOS = async () => {
    setIsLoading(true);
    setNotFound(false);
  
    try {
      const q = query(osCollectionRef);
      //const q = query(osCollectionRef, orderBy('timestamp', 'desc'));
      
      const querySnapshot = await getDocs(q);
    
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
      });
      
      if (osData.length === 0) {
        setNotFound(true);
      }
  
      setOSList(osData);
    } catch (error) {
      console.error('Erro ao listar:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];

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
      <StatusBar  animated={true} style='light'
       />
         
         <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery} 
              style={styles.searchBar}
            />
         </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />// Substitua por um componente de spinner, se desejar
        ) : notFound ? (
          <Text>Nenhum item encontrado.</Text>
        ) : (
          <Listar osList={osList} />
        )}
    </View>
   
    )}/>
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