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

const handlePressCliente = (clienteId) => {
  navigation.navigate('Cliente', { clienteId: clienteId });
};

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cliente teste"));
        const listaClientes = [];
        querySnapshot.forEach((doc) => {
          listaClientes.push({ id: doc.id, ...doc.data() });
        });
        setClientes(listaClientes);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    carregarClientes();
  }, []);

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Atualiza o estado de não encontrado se não houver clientes após a filtragem
    setNotFound(searchQuery.length > 0 && filteredClientes.length === 0);
  }, [searchQuery, filteredClientes]);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressCliente(item.id)}>
      <Card style={styles.card}>
        <View style={styles.clienteItem}>
          <Image source={{ uri: item.foto }}  style={styles.clienteFoto} />
          <View style={styles.clienteInfo}>
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
    marginLeft: 10,
  },
  card: {
    // Ajuste esses valores conforme necessário para combinar com o design
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20, // Aumente o raio da borda para que seja mais arredondado
    padding: 15,
    marginBottom: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  clienteItem: {
    flexDirection: 'row', // Isso garante que a foto e o texto fiquem lado a lado
    alignItems: 'center', // Isso alinha verticalmente a foto e o texto
    borderRadius: 15, // Isso vai arredondar as bordas do card
    overflow: 'hidden', // Isso garante que o conteúdo não ultrapasse as bordas arredondadas

  },
  clienteFoto: {
    width: 70, // Ajuste a largura como desejado
    height: 70, // A altura deve ser igual à largura para ser um círculo
    borderRadius: 35, // A metade da largura/altura para ser completamente arredondado
    borderWidth: 1, // Ajuste a largura da borda conforme desejado
    borderColor: 'white', // Ajuste a cor da borda conforme desejado
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
