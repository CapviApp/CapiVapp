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
import { useNavigation } from '@react-navigation/native';

import Prioridade from './Prioridade';
import { OsItemH, OsItemV } from '../components/OS';

import ListaHorizontal from '../../components/layout/ListaHorizontal/ListaHorizontal';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {


  const navigation = useNavigation()


  const data = [
    '#FF33FF',
    '#3366E6',
    '#B34D4D',
    '#00B3E6'
  ]

  
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  console.log('HomeScreen');

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
    marginBottom: '30%',
    
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