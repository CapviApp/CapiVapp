import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {addDoc, collection,query, getDocs,updateDoc,deleteDoc,where,} from 'firebase/firestore';
import { db } from '../../config/firebase';
import {format,addHours,set,getUnixTime,} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz/esm';
import Listar from './NewOS'

export default function NewCliente() {
 
  

  return (
    <View>
      <Text>Hello World</Text>
      <Listar/>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
};