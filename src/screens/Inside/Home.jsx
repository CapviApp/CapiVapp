import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Feather,
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign, 
} from '@expo/vector-icons'
import { Searchbar } from 'react-native-paper';
import React, {useState} from 'react'


import Prioridade from './Prioridade';
import { OsItemH, OsItemV } from '../components/OS';


import ListaHorizontal from '../../components/layout/ListaHorizontal/ListaHorizontal';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {

  const data = [
    '#FF33FF',
    '#3366E6',
    '#B34D4D',
    '#00B3E6'
  ]

  
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const name = 'Lara'
  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
    <ScrollView>
    <View style={styles.container}>
      <StatusBar  animated={true} style='light'
       />
         
         <Text style={styles.subTitle}>Olá, {name}!</Text>
         <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Pesquisar"
              onChangeText={onChangeSearch}
              value={searchQuery} 
              style={styles.searchBar}
            />
          </View>
          <ListaHorizontal 
              data={data}
              />
          <Text 
              style={styles.title} >
              Ordens de Serviço Novas
            </Text>
            <View style={styles.NovasContainer}>
              <OsItemV style={styles.novaOS} data="06/10/2023" title="001-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
              <OsItemV style={styles.novaOS} data="07/10/2023" title="002-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            </View>
            <View style={styles.NovasContainer}>
              <OsItemV style={styles.novaOS} data="08/10/2023" title="003-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
              <OsItemV style={styles.novaOS} data="09/10/2023" title="004-2023" prioridade="alta" onPress={() => navigation.navigate("os")}/>
            </View>
           
          <TouchableOpacity 
            style={styles.buttonText}
            onPress={() => navigation.navigate("prioridade")}
            >
              <Text style={styles.title} >
              OS Prioridade Alta</Text>
            
            <AntDesign 
              name="right" 
              size={24} 
              color="white" 
              style={styles.icon} 
            />
          </TouchableOpacity>
          <View style={styles.PrioridadeContainer}>
            <OsItemH data="10/10/2023" title="005-2023" prioridade="alta" status="Iniciada"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="11/10/2023" title="006-2023" prioridade="alta" status="Em espera"onPress={() => navigation.navigate("os")}/>
            <OsItemH data="12/10/2023" title="007-2023" prioridade="alta" status="Iniciada"onPress={() => navigation.navigate("os")}/>
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
    marginBottom: '30%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    paddingStart: 20,
  
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    paddingStart: 20,
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
  PrioridadeContainer:{

  }
});
