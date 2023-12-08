import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setNotFound(false); // Reseta o estado de não encontrado quando a busca muda
  };

const navigation = useNavigation();



  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cliente teste"));
        const listaClientes = [];
        const clienteID = doc.id
        
        querySnapshot.forEach((doc) => {
          listaClientes.push({ id: doc.id, ...doc.data() });
          
        });
        setClientes(listaClientes);
        console.log(clienteID);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
      
    };
    

    carregarClientes();
  }, []);

  const handlePressCliente = (item) => {
    navigation.navigate('Cliente', { clienteItem: item });
    console.log('id', item);
  };

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Atualiza o estado de não encontrado se não houver clientes após a filtragem
    setNotFound(searchQuery.length > 0 && filteredClientes.length === 0);
  }, [searchQuery, filteredClientes]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressCliente(item)}>
      <Card style={styles.card}>
        <View style={styles.clienteItem}>
          <Image source={{ uri: item.foto }}  style={styles.clienteFoto} />
          <View style={styles.clienteFoto}>
            <Text style={styles.clienteNome}>{item.nome}</Text>
            <Text style={styles.clienteData}>{item.data}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.gradient}>
        <Text style={styles.titulo}>Clientes</Text>
        <Searchbar
          placeholder="Buscar Cliente"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        {notFound && (
          <Text style={styles.notFoundText}>Não foi encontrado</Text>
        )}
      <FlatList
        data={filteredClientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={searchQuery.length === 0 && !notFound ? () => (
          <Text style={styles.subtitulo}>Mais recentes:</Text>
        ) : null}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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