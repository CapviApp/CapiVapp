import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../../config/firebase';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Searchbar, Card } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list'
export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    async function fetchClientes() {
      const q = query(collection(db, "clientes"));
      const querySnapshot = await getDocs(q);
      const clients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClientes(clients);
    }

    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter((cliente) => {
    // Aplica o filtro de busca
    return cliente.nome.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const handleSearch = (query) => setSearchQuery(query);
  const handleSelect = (value) => setSelectedFilter(value);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.clienteItem}>
      <Image source={{ uri: item.imagem }} style={styles.imagemCliente} />
      <View style={styles.infoCliente}>
        <Text style={styles.nomeCliente}>{item.nome}</Text>
        <Text style={styles.dataCliente}>{item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Clientes</Text>
      <Searchbar
        placeholder="Buscar cliente"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <SelectList
        placeholder="Filtrar por"
        setSelected={setSelectedFilter}
        data={[
          { value: 'status', label: 'Status' },
          { value: 'data', label: 'Data' },
          { value: 'prioridade', label: 'Prioridade' },
          { value: 'tipo', label: 'Tipo' },
        ]}
        onSelect={handleSelect}
        search={false}
      />
      <ScrollView>
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} style={styles.clienteItem}>
            <Card.Title
              title={cliente.nome}
              subtitle={cliente.data}
              left={(props) => <Image source={{ uri: cliente.imagem }} style={styles.imagemCliente} {...props} />}
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08354a',
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  searchbar: {
    marginBottom: 10,
  },
  clienteItem: {
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  clienteItem: {
    flexDirection: 'row',
    backgroundColor: '#10456e',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagemCliente: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoCliente: {
    marginLeft: 10,
  },
  nomeCliente: {
    fontSize: 18,
    color: 'white',
  },
  dataCliente: {
    fontSize: 14,
    color: 'white',
  },
  searchbar: {
    marginVertical: 10,
  },
  selectList: {
  },
});
