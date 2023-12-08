import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Text, StyleSheet, SectionList } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { db } from '../../config/firebase';

function Listar({ selecionarOS }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [osList, setOSList] = useState([]);

  const getBorderColorByPriority = (priority) => {
    switch (priority) {
      case 'alta':
        return 'rgb(255, 0, 0)';
      case 'media':
        return 'rgb(255, 165, 0)';
      case 'baixa':
        return 'rgb(0, 128, 0)';
      default:
        return 'grey';
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'teste'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const osData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOSList(osData);
      setIsLoading(false);
    }, (error) => {
      console.error('Erro ao carregar dados:', error);
      setIsLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const navigateToOS = (item) => {
    // Implemente a navegação para a tela de detalhes da OS aqui
    // Exemplo: navigation.navigate('DetalheOS', { osId: item.id });
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SectionList
          sections={[{ data: osList }]}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
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
