import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';

import { db } from '../../config/firebase';

export default function EditOS({ osList, selecionarOS }) {
  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'Ordem de Serviço');
  const navigation = useNavigation();
//teste
  const loadOS = async () => {
    try {
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
      });
      console.log('Dados carregados:', osData);
      setOSList(osData);
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    }
  };

  // Função para atualizar campos específicos de uma OS
  const updateOS = async (osId, { prioridade, status, comentario, imageUri }) => {
    try {
      const osRef = doc(osCollectionRef, osId);
      const updateData = {
        ...(prioridade && { prioridade }), // Atualiza apenas se prioridade for fornecida
        ...(status && { status }), // Atualiza apenas se status for fornecido
        ...(comentario && { comentarios: comentario }), // Atualiza apenas se comentario for fornecido
        ...(imageUri && { imageUri }), // Atualiza apenas se imageUri for fornecido
      };

      await updateDoc(osRef, updateData);
      console.log('Atualização realizada com sucesso!');
      loadOS();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar OS</Text>
      {/* Componentes de UI para editar a OS */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});
