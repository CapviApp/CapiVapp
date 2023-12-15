import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SectionList, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db, uploadToFirebase, listFiles } from '../../config/firebase';
import { getStorage, ref, listAll } from "firebase/storage";
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function CustomSelectList({ data, onSelect, defaultValue, setSelected }) {
  const handleSelect = (value) => {
    onSelect(value);
    setSelected(data.find((item) => item.value === value)); 
    onSelectCliente(value);
  };

  return (
    <SelectList
      data={data}
      onSelect={handleSelect}
      defaultValue={defaultValue}
    />
  );
}
export default function NewOS({ navigation })  {

  const [osId, setOsId] = useState('');
  const [cliente, setCliente] = useState('');
  const [tipoHardware, setTipoHardware] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [outros, setOutros] = useState('');
  const [prioridade, setPrioridade] = useState('baixa');
  const [comentario, setComentario] = useState('');
  const [osList, setOSList] = useState([]);
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [statusOS, setStatusOS] = useState('Novo');
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = React.useState({ value: "" });
  const [selectedTipoHardware, setSelectedTipoHardware] = useState('');
  const [selectedTipoServico, setSelectedTipoServico] = useState('');
  const [selectedPrioridade, setSelectedPrioridade] = useState('');
  const [selectedCliente, setSelectedCliente] = useState('')
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null)
  const [clientes, setClientes] = useState([])

  const userCollectionRef = collection(db, 'Clientes');
  const osCollectionRef = collection(db, 'Ordem de Serviço');

  const [files, setFiles] = useState([])
  

  const [permission, requestPermission] = ImagePicker.useCameraPermissions()

  const listUser = async () => {
    try {
      const querySnapshot = await getDocs(userCollectionRef);
      const userList = querySnapshot.docs.map((doc) => {
        const cliente = doc.data();
        return { id: doc.id, label: cliente.nome, value: doc.id };
      });
  
      setClientes(userList);
    } catch (error) {
      console.log(error);
    }
  };

  const getNextOsId = async () => {
    try {
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      const osCount = querySnapshot.size;
      const nextId = osCount + 1;
      setOsId(nextId.toString());
    } catch (error) {
      console.error('Erro ao obter o próximo ID da Ordem de Serviço:', error);
    }
  };

  const handleSelectCliente = (value) => {
    setCliente(value);
    setSelectedCliente(clientes.find((item) => item.value === value));
  };
//teste
  const adicionarOS = async () => {
    try {
      const dataAtualUTC = new Date();
      const dataAtualBrasilia = utcToZonedTime(dataAtualUTC, 'America/Sao_Paulo');
      const dataFormatada = format(dataAtualBrasilia, 'dd-MM-yyyy / HH:mm');
      
      let docRef;
  
      docRef = await addDoc(osCollectionRef, {
        data: dataFormatada,
        cliente: selectedCliente,
        tipoHardware: selectedTipoHardware, 
        tipoServico: selectedTipoServico,
        outros: outros,
        prioridade: selectedPrioridade,
        comentario: comentario,
        descricaoProduto: descricaoProduto,
        statusOS: 'Novo',
        imageUri: imageUri, // isto deveria ser algo diferente?
        // statusOS: statusOS, selectedCliente
      });
  
      const osId = docRef.id;
  
      alert(`Ordem de serviço cadastrada com sucesso! ID: ${osId}`);
      
      limparCampos();
      loadOS();
    } catch (error) {
      console.error('Erro ao cadastrar ordem de serviço:', error);
    }
  };
  
  const listOS = async () => {
    try {
      //const selectedValue = selected; 
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      
  
      const osData = [];
      querySnapshot.forEach((doc) => {
        osData.push({ id: doc.id, ...doc.data() });
      });
      setOSList(osData);
    } catch (error) {
      console.error('Erro ao listar:', error);
    }
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
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
    }
  };

  useEffect(() => {
    
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        setImageUri( value.fullPath)
        return {name : value.fullPath }
        
      })
      setFiles(files)
    })
    getNextOsId();
    loadOS();
    listUser(); 
  }, []); 

  console.log(files);

  const limparCampos = () => {
    setCliente('');
    setTipoHardware('');
    setTipoServico('');
    setOutros('');
    setPrioridade('baixa');
    setComentario('');
    setDescricaoProduto('');
    setStatusOS('Novo');
    setImageUri(null);
  };

  // Permissoes e configuracoes da camera

  if(permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Sem permissão para usar a câmera - {permission?.status}</Text>
        <Button mode='contained' onPress={requestPermission}> Permitir </Button>
      </View>
    )
   }
  
  
  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
  ];
  

  // Função para renderizar um item individual na SectionList
  const renderItem = ({ item }) => (
    <View>
      {/* Seu componente de item da lista (OsItemH) */}
      <Text>{item}</Text>
    </View>
  );
  const goToNewCliente = () => {
    navigation.navigate('newcliente');
  };
  
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
          <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>
  
              <Text style={styles.text}>Cliente:</Text>
              <SelectList
                data={clientes}
                onSelect={(value) => setCliente(value)}
                defaultValue={cliente}
                setSelected={(value) => setSelectedCliente(value)}
                placeholder="Selecione um Cliente"
                dropdownItemStyles={{ color: 'white' }}
                dropdownTextStyles={{ color: 'white' }}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
                searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
                closeicon={<Ionicons name="close" size={24} color="white" />}
                boxStyles={{ color: 'white', borderColor: 'white', borderRadius: 30, backgroundColor: '#1A4963' }}
                inputStyles={{ color: 'white', borderColor: 'white' }}
                dropdownStyles={{ borderColor: 'white' }}
                searchPlaceholder=''
              />

            <TouchableOpacity onPress={goToNewCliente} style={styles.addClienteButton}>
                <Text style={styles.addClienteText}>Cadastrar Cliente</Text>
            </TouchableOpacity>

      <Text style={styles.text}>Tipo de Hardware:</Text>
      <SelectList
        data={[
          { label: 'Selecione', value: '' },
          { label: 'Computador e Notebook', value: 'Computador e Notebook' },
          { label: 'Consoles', value: 'Consoles' },
          { label: 'Smartphones', value: 'Smartphones' },
          { label: 'TVs', value: 'TVs' },
          { label: 'Impressora', value: 'Impressora' },
        ]}
        onSelect={(value) => setTipoHardware(value)}
        defaultValue={tipoHardware}
        setSelected={(value) => setSelectedTipoHardware(value)}
        placeholder='Selecionar'
        dropdownItemStyles={{ color: 'whitw' }}
        dropdownTextStyles={{ color: 'white' }}
        arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
        searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
        closeicon={<Ionicons name="close" size={24} color="white" />}
        boxStyles={{ color: 'white', borderColor: 'white', borderRadius: 30, backgroundColor: '#1A4963' }}
        inputStyles={{ color: 'white', borderColor: 'white' }}
        dropdownStyles={{ borderColor: 'white' }}
        searchPlaceholder=''
        />
        
      <Text style={styles.text}>Tipo de Serviço:</Text>
      <SelectList
        data={[
          { label: 'Selecione', value: '' },
          { label: 'Manutenção', value: 'Manutenção' },
          { label: 'Substituição', value: 'Substituição' },
          { label: 'Reparação de Circuito Integrado', value: 'Reparação de Circuito Integrado' },
          { label: 'Ajuste Técnico', value: 'Ajuste Técnico' },
          { label: 'Formatação e Ativação', value: 'Formatação e Ativação' },
          { label: 'Reinstalação de ROM', value: 'Reinstalação de ROM' },
          { label: 'Downgrade de ROM', value: 'Downgrade de ROM' },
          { label: 'Microinformática', value: 'Microinformática' },
          { label: 'Nenhuma da Opções Anteriores', value: 'Nenhuma da Opções Anteriores' },
        ]}
        onSelect={(value) => setTipoServico(value)}
        defaultValue={tipoServico}
        setSelected={setSelectedTipoServico} 
        placeholder='Selecionar'
        dropdownItemStyles={{ color: 'white' }}
        dropdownTextStyles={{ color: 'white' }}
        arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
        searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
        closeicon={<Ionicons name="close" size={24} color="white" />}
        boxStyles={{ color: 'white', borderColor: 'white', borderRadius: 30, backgroundColor: '#1A4963' }}
        inputStyles={{ color: 'white', borderColor: 'white' }}
        dropdownStyles={{ borderColor: 'white' }}
        searchPlaceholder=''
      />
              <Text style={styles.text}>Outros:</Text>
              <TextInput
                placeholder="Comentários adicionais"
                value={outros}
                onChangeText={(text) => setOutros(text)}
                style={styles.input}
                placeholderTextColor={color='#DEDEDE'}
              />
      
              <Text style={styles.text}>Prioridade:</Text>
              <SelectList
                data={[
                  { label: 'Baixa', value: 'baixa' },
                  { label: 'Média', value: 'média' },
                  { label: 'Alta', value: 'alta' },
                ]}
                onSelect={(value) => setPrioridade(value)}
                defaultValue={prioridade}
                setSelected={setSelectedPrioridade}
                placeholder='Selecionar'
                dropdownItemStyles={{ color: 'white' }}
                dropdownTextStyles={{ color: 'white' }}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
                searchicon={<FontAwesome name="search" size={12} color={'white'} />} 
                closeicon={<Ionicons name="close" size={24} color="white" />}
                boxStyles={{ color: 'white', borderColor: 'white', borderRadius: 30, backgroundColor: '#1A4963'  }}
                inputStyles={{ color: 'white', borderColor: 'white' }}
                dropdownStyles={{ borderColor: 'white' }}
                searchPlaceholder=''
              />
      
              <Text style={styles.text}>Comentário:</Text>
              <TextInput
                placeholder="Comentário da OS"
                value={comentario}
                onChangeText={(text) => setComentario(text)}
                style={styles.input}
                placeholderTextColor={color='#DEDEDE'}
              />
      
              <Text style={styles.text}>Descrição do Produto:</Text>
              <TextInput
                placeholder="Descrição do produto"
                value={descricaoProduto}
                onChangeText={(text) => setDescricaoProduto(text)}
                style={styles.input}
                placeholderTextColor={color='#DEDEDE'}
              />
              <View style={styles.photoButtonContainer} >
              <TouchableOpacity style={styles.photoButton} onPress={navigateToFotos}>
                <Icon name="add-a-photo" size={24} color="#fff" style={styles.iconStyle} />
                <Text style={styles.photoButtonText}>Adicionar Anexo</Text>
              </TouchableOpacity>       
              
              </View>

              <View style={styles.buttonContainer}>
                <Button onPress={adicionarOS} mode='contained' style={styles.button}>Salvar</Button>
                <Button onPress={limparCampos} mode='contained' style={styles.button}>Cancelar</Button>
              </View>
            </View>
        
        )}
        keyExtractor={(item, index) => index.toString()}
      />
   
    </LinearGradient>
  );
}

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
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 5,
    elevation: 2,
     
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,    
  },
  selectList: {
    backgroundColor: '#fff',
    
  },

   text: {
    color: 'white',
    paddingBottom: 5,
    paddingTop: 20,
    fontWeight: 'bold',
    
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff', // Border color
    paddingVertical: 4,
    paddingStart: 10,
    color: 'white',
    borderRadius: 20, 
    
  },
  button: {
    flex: 1, 
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)', 
    paddingVertical: 5, 
    paddingHorizontal: 20, 
    borderRadius: 40, 
    color: 'white',
    fontSize: 10, 
    backgroundColor: '#4604B1', 
    width: '20%',
    alignSelf: 'center', 
  },

  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row'
  },
  photoButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    marginTop: 1, // Espaço acima do botão
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
  clienteSelectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 15,
  },
  addClienteText: {
    color: '#D9D9D9',
    fontSize: 14,
    paddingTop: 10,
  },
});