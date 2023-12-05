import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text, Button, StyleSheet, SectionList } from 'react-native';
import { addDoc, collection, query, getDocs, doc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { db } from '../../config/firebase';

function Listar({ osList, selecionarOS }) {
  const navigation = useNavigation(); // Move the useNavigation hook inside the function component

  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');

 

  return (
    <SectionList
      sections={[{ data: osList }]}
      renderItem={({ item }) => {
        console.log('Item:', item);
  
        return (
          <TouchableOpacity onPress={() => navigateToOS(item)}>
            <View style={styles.container}>
              <View style={styles.containerText}>
                <Text>Status: {item.status}</Text>
                <Text>Data: {item.data}</Text>
               
                <Text>Cliente: {typeof item.cliente === 'object' ? item.cliente.value : item.cliente}</Text>
              
              </View>
              <TouchableOpacity  onPress={() => navigateToOS(item)}
                style={styles.button}>
                <Feather name="edit" size={24} color="white" />
              </TouchableOpacity>
              
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
    marginLeft: 100,
  },
});