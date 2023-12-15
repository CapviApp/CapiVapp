import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

export default function ClienteList(navegation) {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const handlePressCliente = (email) => {
    navigation.navigate('Cliente', { email: email });
  };
  const onChangeSearch = query => {
    setSearchQuery(query);
    setNotFound(false);
  };//teste

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Clientes"));
        const listaClientes = [];
        
        querySnapshot.forEach((doc) => {
          listaClientes.push({ ...doc.data(), id: doc.id });
        });
        setClientes(listaClientes);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        setIsLoading(false);
      }
    };
    carregarClientes();
  }, []);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome && cliente.nome.toLowerCase().includes(searchQuery.toLowerCase())
);

  useEffect(() => {
    setNotFound(searchQuery.length > 0 && filteredClientes.length === 0);
  }, [searchQuery, filteredClientes]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressCliente(item.email)}>
      <Card style={styles.card}>
        <View style={styles.clienteItem}>
          
          <Image 
            source={item.foto ? { uri: item.foto } : require('../../../assets/cliente.jpeg')} 
            style={styles.clienteFoto}
          />
          <View>
            <Text style={styles.clienteNome}>{item.nome}</Text>
            <Text style={styles.clienteData}>{item.email}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.gradient}>
        <Text style={styles.titulo}>Clientes</Text>
        <Searchbar placeholder="Buscar Cliente"onChangeText={onChangeSearch}value={searchQuery}style={styles.searchbar}/>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : notFound ? (
          <Text style={styles.notFoundText}>Não foi encontrado</Text>
        ) : (
          <FlatList
            data={filteredClientes}
            renderItem={renderItem}
            keyExtractor={(item) => item.email}
            ListHeaderComponent={searchQuery.length === 0 && !notFound ? () => (
              <Text style={styles.subtitulo}>Mais recentes:</Text>
            ) : null}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center', 
    textAlign: 'center',
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 30,
  },
  subtitulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  card: {
    
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'white',
    
  },
  clienteItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 15, 
    overflow: 'hidden', 

  },
  clienteFoto: {
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    borderWidth: 1, 
    borderColor: 'white', 
    marginRight: 10,
    
  },
  clienteNome: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold', 
    marginLeft: 10,
  },
  clienteData: {
    fontSize: 14,
    color: 'white',
  },
  notFoundText: {
    color: 'red', 
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
});