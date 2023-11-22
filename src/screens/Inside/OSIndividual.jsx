import { StatusBar } from 'expo-status-bar';
import { FlatList, TouchableOpacity, View, Text, Button, StyleSheet } from 'react-native';
import {addDoc, collection,query, getDocs,doc,updateDoc,deleteDoc,where,} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OSIndividual({ osList, selecionarOS}) {



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
      console.log('Dados carregados:', osData);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OS</Text>
      <Button title="Deletar"  onPress={() => deleteOS(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});
