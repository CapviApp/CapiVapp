import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { addDoc, collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';

import { db } from '../../config/firebase';

export default function EditOS({ osList, selecionarOS}) {

    const [osListState, setOSList] = useState([]);
    const osCollectionRef = collection(db, 'teste');
    const navigation = useNavigation()

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
          return osData;
        } catch (error) {
          console.error('Erro ao carregar ordens de serviço:', error);
        }
      };
    
      const updateDoc = async (osId) => {
        try {
          const osRef = doc(osCollectionRef, osId);
          await updateDoc(osRef, {
            cliente: cliente,
            tipoHardware: tipoHardware,
            tipoServico: tipoServico,
            outros: outros,
            prioridade: prioridade,
            comentario: comentario,
            descricaoProduto: descricaoProduto,
            status: status,
          });
      
          console.log('Atualização realizada com sucesso!');
          limparCampos();
          setEditMode(false);
          loadOS();
        } catch (error) {
          console.error('Erro ao atualizar:', error);
        }
      };
    const updateOS = async (osId, updateData) => {
        try {
            const osRef = doc(osCollectionRef, osId);
            await firebaseUpdateDoc(osRef, updateData);
            
            console.log('Atualização realizada com sucesso!');
            // limparCampos();  // Defina esta função se necessário
            // setEditMode(false);  // Defina esta função se necessário
            loadOS();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EditarOS</Text>
      
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
})