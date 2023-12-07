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

  //const navigateToOS = (item) => {
    // Navegação para a tela de detalhes da OS
    // navigation.navigate('DetalheOS', { osId: item.id });
 // };

  const getBorderColorByPriority = (priority) => {
    console.log('Prioridade recebida:', priority); // Adicionado para depuração
    switch (priority) {
      case 'alta':
        return 'rgb(255, 0, 0)'; // Vermelho
      case 'media':
        return 'rgb(255, 165, 0)'; // Laranja
      case 'baixa':
        return 'rgb(0, 128, 0)'; // Verde
      default:
        return 'grey';
    }
  };

  return (
    <SectionList
      sections={[{ data: osList }]}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigateToOS(item)}>
            <View style={[styles.container, { borderColor: getBorderColorByPriority(item.prioridade) }]}>
              <View style={styles.containerText}>
                <Text style={styles.textStyle}>Status: {item.status}</Text>
                <Text style={styles.textStyle}>Data: {item.data}</Text>
                <Text style={styles.textStyle}>Cliente: {typeof item.cliente === 'object' ? item.cliente.value : item.cliente}</Text>
                <Text style={styles.textStyle}>Prioridade: {item.prioridade}</Text>
              </View>
              <TouchableOpacity onPress={() => navigateToOS(item)} style={styles.button}>
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
    borderWidth: 2,
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    marginVertical: 7,
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 2,
  },
  containerText: {
    flexDirection: 'column',
    flex: 3,
  },
  button: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
});