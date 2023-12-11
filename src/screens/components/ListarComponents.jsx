import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, Button, StyleSheet, SectionList } from 'react-native';
import { addDoc, collection, query, getDocs, doc, updateDoc, deleteDoc, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { db } from '../../config/firebase';

function Listar({ osList, selecionarOS }) {
  const navigation = useNavigation(); // Move the useNavigation hook inside the function component
  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');

  useEffect(() => {
    try {
      // Query com ordenação decrescente pelo campo 'timestamp'
      const q = query(osCollectionRef, orderBy('timestamp', 'desc'));
      const subscriber = onSnapshot(q, {
        next: (snapshot) => {
          const osData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setOSList(osData);
        }
      });
      return () => subscriber();
    } catch (error) {
      console.error('Erro ao listar:', error);
    }
  }, []);

  const navigateToDetails = (item) => {
    navigation.navigate("os", { osItem: item });
    console.log('id:',item);
  };
  
  return (
    <SectionList
      sections={[{ data: osList }]}
      renderItem={({ item }) => {  
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.container}>
              <View style={styles.containerText}>
                <Text style={styles.text}>status: {item.statusOS}</Text>
                <Text style={styles.text}>Data: {item.data}</Text>
                <Text style={styles.text}>Cliente: {typeof item.cliente === 'object' ? item.cliente.value : item.cliente}</Text>
                <Text style={styles.text}>Prioridade: {item.prioridade}</Text>
              </View >              
            </View>
          </TouchableOpacity>
        );
      }}
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
    marginLeft: 110,
    position: 'fixed',
  },
  text: {
    color: 'white'
  }
});