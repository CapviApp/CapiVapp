import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SectionList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import Listar from '../components/ListarComponents';
import CarrosselOS from '../components/carrossel/CarrosselOS';
import OSCarrossel from '../components/carrossel/OS';
import { OsItemH } from '../components/OS';
import { Filtro } from '../components/Filtro';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function Prioridade({ navigation }) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [osList, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'Ordem de Serviço');
  
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

    <SectionList
    sections={data}
    renderItem={renderItem}
    renderSectionHeader={({ section: { title } }) => (
      <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
    
      <View style={styles.container}>
        <Text style={styles.title}>OS Prioritárias</Text>
        <View style={styles.searchContainer}>
              <Searchbar
                placeholder="Pesquisar"
                onChangeText={onChangeSearch}
                value={searchQuery} 
                style={styles.searchBar}
              />
            </View>
            <View>
            <Text style={styles.subTitle}>Filtros:</Text>
                <Filtro title='Status'/>
                <Filtro title='Tipo Serviço'/>
                <Filtro title='Tipo Hardware'/>
                <Filtro title='Cliente'/>
                <Filtro title='Data'/>
             </View>
            <Text style={styles.subTitle}>Prioritárias:</Text>
  
           <Listar osList={osList}/>
           
      </View>
      
      </LinearGradient>

    )}/>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    marginBottom: '10%',
    marginTop: '10%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
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
    widht: '100%',
  },
  CarrosseContainer: {
    height: 400,
  },
  carrossel: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBar: {
    width: '90%'
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
