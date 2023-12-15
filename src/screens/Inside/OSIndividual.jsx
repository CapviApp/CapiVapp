import { StatusBar, FlatList, TouchableOpacity, View, Text, StyleSheet, Image, SectionList, TextInput, ScrollView, KeyboardAvoidingView  } from 'react-native';import {addDoc, collection,query, getDocs,doc,updateDoc,editDoc,where,} from 'firebase/firestore';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db, uploadToFirebase, listFiles } from '../../config/firebase';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-paper';
import Fotos from './Fotos';
import * as ImagePicker from 'expo-image-picker'
import { setDoc } from "firebase/firestore";


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
  const osId = osItem?.id;

  const [permission, requestPermission] = ImagePicker.useCameraPermissions()
  
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
    const osDocRef = doc(db, 'OS', osId);
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
  const navigateToFotos = () => {
    if (!osId) {
      Alert.alert('Erro', 'O ID da OS não está definido.');
      return;
    }
  
    navigation.navigate('fotos', { osId });
  };
  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          
          <View style={styles.container}>
            <AntDesign style={styles.icon} name="leftcircle" size={30} color="white" onPress={() => navigation.navigate("drawerhome")}/>

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

            <TouchableOpacity style={styles.photoButton} onPress={navigateToFotos}>
                <Icon name="add-a-photo" size={24} color="#fff" style={styles.iconStyle} />
                <Text style={styles.photoButtonText}>Adicionar Anexo</Text>
              </TouchableOpacity>
            </View>
            {isEditing ? (
                      <>
                        <TextInput 
                          style={styles.input} 
                          value={newComment} 
                          onChangeText={setNewComment} 
                          placeholder="Adicione um comentário"
                          placeholderTextColor="#DEDEDE"
                        />
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity onPress={onSave} style={[styles.button, styles.saveButton]}>
                            <Text style={styles.buttonText}>Salvar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setIsEditing(false)} style={[styles.button, styles.cancelButton]}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                      ) : (
                        <View style={styles.editButtonContainer}>
                          <TouchableOpacity onPress={() => setIsEditing(true)} style={[styles.button, styles.editButton]}>
                            <Text style={styles.buttonText}>Editar</Text>
                          </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.commentsContainer}>
                      {comments.map((comment, index) => (
                        <Text key={index} style={styles.commentStyle}>{comment}</Text>
                      ))}
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
    paddingBottom: '15%',
    paddingTop: 40,
   
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
    borderRadius: 23,
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
    marginBottom: 10,
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
    marginTop:10,
    fontSize: 16,
    paddingVertical: 10,
  },
  photoButton: {
    backgroundColor: '#08354a', // Cor de fundo do botão
    paddingVertical: 12, // Espaçamento vertical dentro do botão
    paddingHorizontal: 77, // Espaçamento horizontal dentro do botão
    borderRadius: 20, // Bordas arredondadas
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Sombra no Android
    marginTop: 10, // Espaço acima do botão
    borderWidth: 1,
    borderColor: '#fff', // Border color
  },
  
  iconStyle: {
    marginRight: 8,
  },
  photoButtonText: {
    color: '#fff', // Text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
  },
  button: {
    flex: 1, 
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 5, // Espaçamento entre os botões
    minWidth: 100, // Largura mínima do botão
    justifyContent: 'center', // Centraliza o texto no botão
    backgroundColor: '#4604B1',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4604B1',  
    borderColor: 'rgba(255, 255, 255, 0.6)', 
  },
  cancelButton: {
    backgroundColor: '#4604B1',
    borderColor: 'rgba(255, 255, 255, 0.6)', 
   },
  buttonText: {
    textAlign: 'center',
    color: 'white', // Cor do texto
  },
  
});