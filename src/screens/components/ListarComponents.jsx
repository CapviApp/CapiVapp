import React,{ useState, useEffect }  from 'react';
import { FlatList, TouchableOpacity, View, Text, Button, StyleSheet } from 'react-native';
import {addDoc, collection,query, getDocs,doc,updateDoc,deleteDoc,where,} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../config/firebase';

function Listar({ osList, selecionarOS}) {

  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');
  const navigation = useNavigation()
  const [docId, setDocId] = useState('')



  

  const  renderItem = ( { item } ) => ( 
    <TouchableOpacity onPress={() => navigation.navigate('os', {id: item.id})} >
          <View style={styles.container}>
            <View style={styles.containerText}>
          <Text>Status: {item.status}</Text>
           

            <Text>Data: {item.data}</Text>
            <Text>Cliente: {item.cliente}</Text>                   
            <Text>Prioridade: {item.prioridade}</Text>           
           
           
            </View>
            
           
            <TouchableOpacity onPress={() => navigation.navigate("editOS", {osId: item.id})} style={styles.button}>
                <FontAwesome name="pencil-square-o" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
  ); 

  useEffect(() => {
  
    loadOS();
  }, []);

  return (
    <FlatList
      data={osListState}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      vertical
    />
  );
}

export default Listar;

const styles = StyleSheet.create({
  container:{
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
    marginLeft: 90,
  }
})