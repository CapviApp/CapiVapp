import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper';
import React, {useState} from 'react'

import { Filtro } from '../components/Filtro';
import { OsItemH } from '../components/OS';

export default function Historico({ navigation }) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Historico OS</Text>
      <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery} 
              style={styles.searchBar}
            />
          </View>
           <View>
           <Text style={styles.subTitle}>Filtros:</Text>
              <Filtro title='Prioridade'/>
              <Filtro title='Status'/>
              <Filtro title='Tipo Serviço'/>
              <Filtro title='Tipo Hardware'/>
              <Filtro title='Cliente'/>
              <Filtro title='Data'/>
           </View>
           <Text style={styles.subTitle}>Ordens de Serviço</Text>
           <View style={styles.PrioridadeContainer}>
            <OsItemH data="10/10/2023" title="005-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="13/10/2023" title="008-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="14/10/2023" title="009-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="15/10/2023" title="010-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="16/10/2023" title="011-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="17/10/2023" title="012-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="18/10/2023" title="013-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
      
          </View>
    </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    marginBottom: '10%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    paddingStart: 22,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    padding: 5,
    paddingStart: 20,
    marginVertical: 10,
  },
  backgroundColor: {
    flex: 1,
    widht: '100%',
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    color: 'white',
    height: 47,
    width: '94%', 
    paddingStart: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: '90%'
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '15%'
  },  
  icon:{
    marginTop: 7,
    marginEnd: 10,
  },
  NovasContainer: {
    height: '100%',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 15,
    justifyContent: 'center',
  },
  prioridade: {
  backgroundColor: "#C61B11"
    
  },
  filtros: {

  },
  filtro: {

  },
});
