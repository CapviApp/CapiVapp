import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useRoute } from '@react-navigation/native';

export default function Cliente() {
  const route = useRoute();
  const { email } = route.params ??{};
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordensServico, setOrdensServico] = useState([]);

  useEffect(() => {
    const carregarDadosCliente = async () => {
      if (!email) {
        setLoading(false);
        return;
      }
  
      try {
        const docRef = doc(db, "Cliente teste", email);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setCliente(docSnap.data());
  
          // Verifique se emailCliente está definido antes de fazer a query
          if (docSnap.data().emailCliente) {
            const osQuery = query(collection(db, "teste"), where("emailCliente", "==", email));
            const osSnapshot = await getDocs(osQuery);
            const osList = osSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrdensServico(osList);
          }
          setLoading(false);
        } else {
          console.log("Cliente não encontrado!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar cliente e OS:", error);
        setLoading(false);
      }
    };
  
    carregarDadosCliente();
  }, [email]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!cliente) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Cliente não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Cliente</Text>
        <Image source={{ uri: cliente.foto }} style={styles.clienteFoto} />
        <Text style={styles.nameText}>{cliente.nome}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Informações</Text>
        <Text style={styles.infoText}>Email: {cliente.email}</Text>
        <Text style={styles.infoText}>Telefone: {cliente.telefone}</Text>
        <Text style={styles.infoText}>CPF: {cliente.cpf}</Text>
      </View>

      <View style={styles.osContainer}>
        <Text style={styles.osTitle}>OS's relacionadas:</Text>
        {ordensServico.map((os, index) => (
          <View key={index} style={styles.osItem}>
            <Text style={styles.osStatusText}>{os.status}</Text>
            <Text style={styles.osPriorityText}>{os.prioridade}</Text>
            <Text style={styles.osIdText}>{os.id}</Text>
            <Text style={styles.dateText}>{os.data}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#08354a',
},
header: {
  alignItems: 'center',
  paddingVertical: 20,
},
dateText: {
  color: 'white',
  fontSize: 16,
  marginBottom: 8,
},
clienteFoto: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: 'white',
},
nameText: {
  color: 'white',
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
},
infoContainer: {
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: 10,
  padding: 20,
  marginHorizontal: 50,
  marginBottom: 16,
  borderWidth: 1, // Ajuste a largura da borda conforme desejado
  borderColor: 'white',
},
infoTitle: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,
},
infoText: {
  color: 'white',
  fontSize: 18,
  marginBottom: 4,
},
osContainer: {
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: 10,
  padding: 16,
  marginHorizontal: 50,
  marginBottom: 20,
  borderWidth: 1, // Ajuste a largura da borda conforme desejado
  borderColor: 'white',
},
osTitle: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,
},
osItem: {
  backgroundColor: '#10456e',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
},
osStatusText: {
  color: 'white',
  fontSize: 16,
  marginBottom: 4,
},
osPriorityText: {
  color: 'red',
  fontSize: 16,
  marginBottom: 4,
},
osIdText: {
  color: 'white',
  fontSize: 16,
  marginBottom: 4,
},
titulo: {
  fontSize: 32,
  color: 'white',
  fontWeight: 'bold',
  marginVertical: 20,
  alignSelf: 'center', 
  textAlign: 'center',
},
});