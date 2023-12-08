import { StatusBar } from 'expo-status-bar';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, Image, SectionList } from 'react-native';
import {addDoc, collection,query, getDocs,doc,updateDoc,deleteDoc,where,} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { Button } from 'react-native-paper';

const OSIndividual = ({route}) => {
  const {osItem} = route.params

  console.log("item: ", osItem);

  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');
  const navigation = useNavigation()

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

  const deleteOS = async (osId) => {
    console.log('Deletando OS com ID:', osId);
  
    if (osId) {
      try {
        const osDocRef = doc(osCollectionRef, osId);
        await deleteDoc(osDocRef);
        console.log('Ordem de serviço excluída com sucesso!', osId);
        loadOS();
      } catch (deleteError) {
        console.error('Erro ao excluir documento:', deleteError);
      }
    } else {
      console.log('Nenhum ID de documento válido para exclusão.');
    }
  }

  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];
  

  // Função para renderizar um item individual na SectionList
  const renderItem = ({ item }) => (
    <View>
      {/* Seu componente de item da lista (OsItemH) */}
      <Text>{item}</Text>
    </View>
  );


  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
   <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          
          <View style={styles.container}>
      <Text style={styles.title}>Ordem de Serviço</Text>
      
            <View >
            <Text style={styles.id}>ID: {osItem?.id}</Text>
            <Text style={styles.data}>Data: {osItem?.data}</Text>
            
              <Text style={styles.cliente}>Cliente: {osItem?.cliente}</Text>  
             
              <SelectList
                data={[
                  { label: 'Iniciada', value: 'Iniciada' },
                  { label: 'em andamento', value: 'em andamento' },
                  { label: 'Concluida', value: 'Concluida' },
                  { label: 'cancelada', value: 'cancelada' },
                ]}
                onSelect={(value) => osItem?.status}
                
                
                placeholder='Selecionar'
                dropdownItemStyles={{ color: 'white' }}
                dropdownTextStyles={{ color: 'white' }}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
                searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
                closeicon={<Ionicons name="close" size={24} color="white" />}
                boxStyles={{ color: 'white', borderColor: 'white', borderRadius: 30, backgroundColor: '#1A4963', marginVertical: 10  }}
                inputStyles={{ color: 'white', borderColor: 'white' }}
                dropdownStyles={{ borderColor: 'white' }}
                searchPlaceholder=''
                
              />
           
          <View style={styles.textContainer}>
           <Text style={styles.detalhes}>Detalhes:</Text>
                  
            <Text style={styles.text}>Prioridade: {osItem?.prioridade}</Text>    
            <Text style={styles.text}>Tipo Servico: {osItem?.tipoServico}</Text> 
            <Text style={styles.text}>Descricao: {osItem?.descricaoProduto}</Text>  
            <Text style={styles.text}>Comentario: {osItem?.comentario}</Text>  
            </View>
           
           
            </View>
          
      <Button  mode='contained'  onPress={() => deleteOS(osItem.id)} >Deletar</Button>
    </View>
        )}
    />
    </LinearGradient>
  );
}

export default OSIndividual

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  cliente: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  id: {
    paddingStart: 15,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  data: {
    paddingStart: 15,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    paddingVertical: 3,
  },
  detalhes: {
   
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 5,
  },


});