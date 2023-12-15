import { Alert,StatusBar, FlatList, TouchableOpacity, View, Text, StyleSheet, Image, SectionList, TextInput, ScrollView, KeyboardAvoidingView  } from 'react-native';import {addDoc, collection,query, getDocs,doc,updateDoc,editDoc,where,} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db, uploadToFirebase, listFiles,  } from '../../config/firebase';
import { getDoc } from 'firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-paper';
import Fotos from './Fotos';
import * as ImagePicker from 'expo-image-picker'
import { setDoc } from "firebase/firestore";

const OSIndividual = ({ route }) => {
  const { osItem } = route.params;
  const [osListState, setOSList] = useState([]);
  const osCollectionRef = collection(db, 'Ordem de Serviço');
  const navigation = useNavigation();
  const [statusOS, setStatusOS] = useState(osItem?.statusOS || 'Novo');
  const [prioridade, setPrioridade] = useState(osItem?.prioridade);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(osItem?.comentarios || []);
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  const osId = osItem?.id;
  const [tempStatusOS, setTempStatusOS] = useState(statusOS);
  const [tempComment, setTempComment] = useState('');

  const [permission, requestPermission] = ImagePicker.useCameraPermissions()
  
  const onStatusChange = (selectedValue) => {
    console.log("Status selecionado:", selectedValue);
    setTempStatusOS(selectedValue);
  };
  //teste

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
    const osDocRef = doc(db, 'Ordem de Serviço', id);
    try {
      await updateDoc(osDocRef, { statusOS: newStatus });
      console.log(`Status da OS ${id} atualizado para ${newStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const editOS = async (osId, updatedData) => {
    const osDocRef = doc(db, 'Ordem de Serviço', osId);
    console.log('Temporário:', tempStatusOS, 'Atual:', statusOS);  
    if (osId && updatedData) {
      try {
        // Preparando os dados para atualização
        const dataToUpdate = {};
        if (updatedData.prioridade !== undefined) dataToUpdate.prioridade = updatedData.prioridade;
        if (updatedData.statusOS !== undefined) dataToUpdate.statusOS = updatedData.statusOS;
        if (updatedData.imageUri !== undefined) dataToUpdate.imageUri = updatedData.imageUri;
  
        // Adiciona o novo comentário ao array existente sem substituir os antigos
        if (updatedData.comentario !== undefined) {
          const osSnapshot = await getDoc(osDocRef);
          const osData = osSnapshot.data();
          const updatedComments = osData.comentarios ? [...osData.comentarios, updatedData.comentario] : [updatedData.comentario];
          dataToUpdate.comentarios = updatedComments;
        }
  
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
  
  const onSave = async () => {
    if (statusOS === 'Novo' && (tempStatusOS === 'Concluído' || tempStatusOS === 'Cancelado')) {
      Alert.alert('Ação não permitida', 'Não é possível mudar o status para Concluído ou Cancelado diretamente do status Novo.');
      return;
    }
  
    if (tempComment.trim() === '') {
      Alert.alert('Erro', 'O comentário não pode ser vazio.');
      return;
    }
  
    if (!tempStatusOS || (tempStatusOS !== 'Iniciada' && tempStatusOS !== 'Pendente' && tempStatusOS !== 'Concluído' && tempStatusOS !== 'Cancelado')) {
      console.log('statusOS:', statusOS, 'tempStatusOS:', tempStatusOS);
      Alert.alert('Erro', 'Selecione um status válido.');
      return;
    }
  
    if (!osItem.id) {
      console.error('Erro: ID da OS não definido.');
      return;
    }

    const osDocRef = doc(db, 'Ordem de Serviço', osItem.id);
    try {
      await updateDoc(osDocRef, { 
        statusOS: tempStatusOS, 
        comentarios: [...comments, tempComment].filter(comment => comment.trim() !== '')
      });
      setStatusOS(tempStatusOS);
      setComments([...comments, tempComment].filter(comment => comment.trim() !== ''));
      setIsEditing(false);
      setNewComment(''); // Limpa o campo de comentário após a atualização
      setTempComment(''); // Adicione esta linha para limpar o campo de entrada do novo comentário
      console.log('OS atualizada com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar a OS:', error);
    }
  };

  const renderStatusSelect = () => (
    <SelectList
      data={
        statusOS === 'Novo'
          ? [{ label: 'Iniciada', value: 'Iniciada' }]
          : statusOS === 'Iniciada'
          ? [
            { label: 'Em andamento', value: 'Pendente' },
            { label: 'Concluída', value: 'Concluído' },
            { label: 'Cancelada', value: 'Cancelado' },]
          : statusOS === 'Concluída' || statusOS === 'Cancelada'
           [
             {label: '', value: ''}
            ]
      }
      selected={tempStatusOS}
      setSelected={setTempStatusOS}
      onSelect={onStatusChange}
      placeholder={tempStatusOS || 'Selecione'}
      dropdownItemStyles={{ color: 'white' }}
      dropdownTextStyles={{ color: 'white' }}
      arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />}
      searchicon={<FontAwesome name="search" size={12} color={'white'} />}
      closeicon={<Ionicons name="close" size={24} color="white" />}
      boxStyles={{
        color: 'white',
        borderColor: 'white',
        borderRadius: 30,
        backgroundColor: '#1A4963',
        marginVertical: 10,
      }}
      inputStyles={{ color: 'white', borderColor: 'white' }}
      dropdownStyles={{ borderColor: 'white' }}
      searchPlaceholder=''
    />
  );

  
  const onEdit = () => {
    setTempStatusOS(statusOS);
    setTempComment('');
    setIsEditing(true);
  };

  const renderComments = () => {
    return comments.map((comment, index) => (
      <View key={index} style={styles.commentCard}>
        <Text style={styles.commentText}>{comment}</Text>
      </View>
    ));
  };
  const data = [
    { title: 'Seção 1', data: [] },
   
  ];
  
  const renderItem = ({ item }) => (
    <View>
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
  useEffect(() => {
    setTempStatusOS(statusOS);
  }, [statusOS]);
  

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
             
             {renderStatusSelect()}
          <View >            
            <Text style={styles.cliente}>Cliente: {osItem?.cliente}</Text>  
            
            <View style={styles.textContainer}>
                <Text style={styles.detalhes}>Detalhes:</Text>
                <Text style={styles.text}>Status: {statusOS}</Text>
                <Text style={styles.text}>Prioridade: {osItem?.prioridade}</Text>    
                <Text style={styles.text}>Tipo de Serviço: {osItem?.tipoServico}</Text> 
                <Text style={styles.text}>Tipo de Hardware: {osItem?.tipoHardware}</Text>
                <Text style={styles.text}>Descrição: {osItem?.descricaoProduto}</Text>  
              </View>

              <Text style={styles.text}>Comentario:</Text> 

              <View style={styles.textContainer}>
                <Text style={styles.text}>Comentario: {osItem?.comentario}</Text>  
            </View>

            <View style={styles.commentsContainer}>
              {renderComments()}
            </View>

            </View>
                <TextInput
                  style={styles.input}
                  value={tempComment}
                  onChangeText={setTempComment}
                  placeholder="Adicione um comentário"
                  placeholderTextColor="#DEDEDE"
                />
                <TouchableOpacity style={styles.photoButton} onPress={navigateToFotos}>
                <Icon name="add-a-photo" size={24} color="#fff" style={styles.iconStyle} />
                <Text style={styles.photoButtonText}>Adicionar Anexo</Text>
              </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={onSave} style={[styles.button, styles.saveButton]}>
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsEditing(false)} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
            </View>
              
           
          </View>
        )}
      />
    </LinearGradient>
  );
};

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
    marginVertical: 10,

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

    commentCard: {
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
  commentText: {
    color: 'white', // ou outra cor de sua escolha
    fontSize: 14,
  },
  
  
});