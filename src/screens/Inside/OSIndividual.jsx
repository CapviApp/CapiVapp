import { StatusBar, FlatList, TouchableOpacity, View, Text, StyleSheet, Image, SectionList, TextInput, ScrollView, KeyboardAvoidingView  } from 'react-native';import {addDoc, collection,query, getDocs,doc,updateDoc,editDoc,where,} from 'firebase/firestore';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db, uploadToFirebase, listFiles } from '../../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import Fotos from './Fotos';
import * as ImagePicker from 'expo-image-picker'

const OSIndividual = ({route}) => {
  const {osItem} = route.params
  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'teste');
  const navigation = useNavigation()
  const [statusOS, setStatusOS] = useState(osItem?.statusOS || 'Novo');
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState({ value: "" });
  const [selectStatusOS, setSelectStatusOS] = useState('Novo');
  const [prioridade, setPrioridade] = useState(osItem?.prioridade);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(''); // Estado para armazenar o novo comentário
  const [comments, setComments] = useState(osItem?.comentarios || []); 
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null)

  const onStatusChange = (value) => {
    setStatusOS(value); // Atualiza o estado 'statusOS'
  };

  const loadOS = async () => {
    try {
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
      });
      setOSList(osData);
      return osData;
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const osDocRef = doc(db, 'teste', id);
    try {
      await updateDoc(osDocRef, { statusOS: newStatus });
      console.log(`Status da OS ${id} atualizado para ${newStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const editOS = async (osId, updatedData) => {
    console.log('Editando OS com ID:', osId);
    if (osId && updatedData) {
      const dataToUpdate = Object.entries(updatedData).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});
        if (Object.keys(dataToUpdate).length === 0) {
        console.error('Erro: Todos os valores para atualização estão indefinidos.');
        return;
      }
      try {
        const osDocRef = doc(osCollectionRef, osId);
        await updateDoc(osDocRef, dataToUpdate);
        console.log('Ordem de serviço atualizada com sucesso!', osId);
        loadOS();
      } catch (updateError) {
        console.error('Erro ao atualizar ordem de serviço:', updateError);
      }
    } else {
      console.log('Nenhum ID de documento válido para atualização ou dados de atualização ausentes.');
    }
  };

  const onSave = () => {
    if (statusOS?.trim()) {
      editOS(osItem.id, { statusOS, comentarios: comments });  
      setIsEditing(false); // Desativa o modo de edição
    } else {
      console.error('Erro: O status está indefinido ou vazio.');
    }
  };

  const addNewComment = () => {
    if (newComment.trim()) { // Verifica se o novo comentário não está vazio
      const updatedComments = [newComment, ...comments]; // Adiciona o novo comentário ao início do array
      setComments(updatedComments); // Atualiza o estado 'comments'
      setNewComment(''); // Limpa o campo de entrada do novo comentário
      editOS(osItem.id, { comentarios: updatedComments }); // Atualiza os comentários na base de dados
    } else {
      console.error('Erro: Não é possível adicionar um comentário vazio.');
    }
  };

  const renderComments = () => {
    return comments.map((comment, index) => (
      <Text key={index} style={styles.comment}>{comment}</Text>
    ));
  };

  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];
  
  const renderItem = ({ item }) => (
    <View>
      {/* Seu componente de item da lista (OsItemH) */}
      <Text>{item}</Text>
    </View>
  );
  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          
          <View style={styles.container}>
             <Text style={styles.title}>Ordem de Serviço</Text>
             <Text style={styles.id}>ID: {osItem?.id}</Text>
             <Text style={styles.data}>Data: {osItem?.data}</Text>
             <Text style={styles.text}>Status da Ordem de Serviço: </Text>
              <SelectList
                data={[
                  { label: 'Iniciada', value: 'Iniciada' },
                  { label: 'Em andamento', value: 'Pendente' },
                  { label: 'Concluída', value: 'Concluído' },
                  { label: 'Cancelada', value: 'Cancelado' },
                ]}
                selected={statusOS}
                setSelected={setStatusOS}
                onSelect={onStatusChange} 
                placeholder={osItem?.status || 'Selecione'} 
                dropdownItemStyles={{ color: 'white' }}
                dropdownTextStyles={{ color: 'white' }}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
                searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
                closeicon={<Ionicons name="close" size={24} color="white" />}
                boxStyles={{ color: 'white', borderColor: 'white', borderRadius: 30, backgroundColor: '#1A4963', marginVertical: 10  }}
                inputStyles={{ color: 'white', borderColor: 'white' }}
                dropdownStyles={{ borderColor: 'white' }}
                searchPlaceholder=''
                
              />
              
          <View >            
            <Text style={styles.cliente}>Cliente: {osItem?.cliente}</Text>  
            
            <View style={styles.textContainer}>
                <Text style={styles.detalhes}>Detalhes:</Text>
                <Text style={styles.text}>Prioridade: {osItem?.prioridade}</Text>    
                <Text style={styles.text}>Tipo de Serviço: {osItem?.tipoServico}</Text> 
                <Text style={styles.text}>Tipo de Hardware: {osItem?.tipoHardware}</Text>
                <Text style={styles.text}>Descrição: {osItem?.descricaoProduto}</Text>  
              </View>

              <Text style={styles.text}>Comentario:</Text> 

              <View style={styles.textContainer}>
                <Text style={styles.text}>Comentario: {osItem?.comentario}</Text>  
            </View>
           
          </View>
                  {isEditing ? (
                  <>
                  <TextInput 
                    style={styles.input}
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Adicione um comentário"
                  />
                  <Button mode='contained' onPress={onSave}>Salvar</Button>
                  <Button mode='contained' onPress={() => setIsEditing(false)}>Cancelar</Button>
                            </>
                  ) : (
                    <Button mode='contained' onPress={() => setIsEditing(true)}>Editar</Button>
                  )}
                        <View style={styles.commentsContainer}>
                          {renderComments()}
                        </View>
            </View>
        )}
    />
    </LinearGradient>
  );
}

export default OSIndividual

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    paddingHorizontal: 10,   
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: '25%',
    
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop:70,
    alignSelf: 'center',
    marginVertical: 50,

  },
  textContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    color: 'white',
    
  },
  cliente: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  id: {
    paddingStart: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  data: {
    paddingStart: 15,
    marginBottom: 20,
    color: 'white',
  },
  text: {
    fontSize: 16,
    paddingVertical: 3,
    color: 'white',
  },
  detalhes: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
    paddingBottom: 5,
  },
  input:{
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    color: 'white',

  }
});