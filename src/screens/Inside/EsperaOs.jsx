import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper';
import React, {useState} from 'react'

import CarrosselOS from '../components/carrossel/CarrosselOS';
import OSCarrossel from '../components/carrossel/OS';
import { OsItemH } from '../components/OS';
import { Filtro } from '../components/Filtro';

export default function EsperaOs({ navigation }) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
//teste
  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>OS em Espera</Text>
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
              <Filtro title='Tipo Serviço'/>
              <Filtro title='Tipo Hardware'/>
              <Filtro title='Cliente'/>
              <Filtro title='Data'/>
           </View>
          <Text style={styles.subTitle}>Prioritárias:</Text>

         <View style={styles.CarrosseContainer}>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carrossel}
              >
              <OSCarrossel title="001-2023" data="23/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="002-2023" data="21/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="003-2023" data="20/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="004-2023" data="20/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="005-2023" data="10/10/2023" status="Em espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="006-2023" data="16/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              
            </ScrollView>
            <Text style={styles.subTitle}>Mais Recentes</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carrossel}
              >
              <OSCarrossel title="001-2023" data="23/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="002-2023" data="21/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="003-2023" data="20/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="004-2023" data="20/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="005-2023" data="10/10/2023" status="Em espera" onPress={() => navigation.navigate("os")}/>
              <OSCarrossel title="006-2023" data="16/10/2023" status="Em Espera" onPress={() => navigation.navigate("os")}/>
              
            </ScrollView>
            </View>
            <Text style={styles.subTitle}>Todas as Ordens de Serviço</Text>
            <View style={styles.PrioridadeContainer}>
            <OsItemH data="10/10/2023" title="005-2023" prioridade="alta" status="Em espera" onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
      
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
    marginBottom: '10%',
    marginTop: '10%',
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
  CarrosseContainer: {
    height: 400,
  },
  carrossel: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBar: {
    width: '90%'
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
