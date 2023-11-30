import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, Button, StyleSheet, SectionList } from 'react-native';
import { addDoc, collection, query, getDocs, doc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../config/firebase';

function Listar({ osList, selecionarOS }) {
  const navigation = useNavigation(); // Move the useNavigation hook inside the function component

  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');

  const [docId, setDocId] = useState('');

  const navigateToOS = (os) => {
    const osId = os.id;
    navigation.push(`editOS/${osId}`); // Use the navigation prop to navigate to the editOS screen
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
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    }
  };

  useEffect(() => {
    loadOS();
  }, []);

  return (
    <SectionList
      sections={[{ data: osListState }]}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigateToOS(item)}> 
          <View style={styles.container}>
            <View style={styles.containerText}>
              <Text>Status: {item.status}</Text>
              <Text>Data: {item.data}</Text>
              <Text>Cliente: {item.cliente}</Text>
              <Text>Prioridade: {item.prioridade}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigateToOS(item)} // Pass the item to the navigateToOS function
              style={styles.button}>
              <FontAwesome name="pencil-square-o" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
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
    marginLeft: 90,
  },
});