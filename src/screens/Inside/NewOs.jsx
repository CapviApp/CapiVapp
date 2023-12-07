
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, StyleSheet, SectionList } from 'react-native';
=======
import { View, Text, TextInput, StyleSheet, SectionList, Alert } from 'react-native';
>>>>>>> origin/components-Lara
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db, uploadToFirebase, listFiles } from '../../config/firebase';
import { getStorage, ref, listAll } from "firebase/storage";
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
<<<<<<< HEAD
import Listar from '../components/ListarComponents';
=======
>>>>>>> origin/components-Lara
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Button } from 'react-native-paper';
<<<<<<< HEAD
//import * as ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
=======

import * as ImagePicker from 'expo-image-picker'
>>>>>>> origin/components-Lara

function CustomSelectList({ data, onSelect, defaultValue, setSelected }) {
  const handleSelect = (value) => {
    onSelect(value);
    setSelected(data.find((item) => item.value === value)); 
  };


  return (
    <SelectList
      data={data}
      onSelect={handleSelect}
      defaultValue={defaultValue}
    />
  );
}
export default function NewOS() {

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
  const [selectedCliente, setSelectedCliente] = useState({ value: '' })
  const [imageUri, setImageUri] = useState(null);
<<<<<<< HEAD
  const [isClienteSelected, setIsClienteSelected] = useState(true);

  const userCollectionRef = collection(db, 'Cliente teste');

  const [clientes, setClientes] = useState([])

=======
 
 const [clientes, setClientes] = useState([])

  const userCollectionRef = collection(db, 'Cliente teste');
>>>>>>> origin/components-Lara
  const osCollectionRef = collection(db, 'teste');
  
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

<<<<<<< HEAD
  useEffect(() => {
    getNextOsId();
    loadOS();
    listUser(); 
  }, []);
=======
>>>>>>> origin/components-Lara
  
  
  const adicionarOS = async () => {
    try {
      const dataAtualUTC = new Date();
      const dataAtualBrasilia = utcToZonedTime(dataAtualUTC, 'America/Sao_Paulo');
      const dataFormatada = format(dataAtualBrasilia, 'dd-MM-yyyy / HH:mm');
      
      let docRef;
  
      if (!selectedCliente || !selectedCliente.value) {
        console.error('Erro: Cliente não selecionado');
        return;
      }
      docRef = await addDoc(osCollectionRef, {
        data: dataFormatada,
        cliente: selectedCliente,
        tipoHardware: selectedTipoHardware, 
        tipoServico: selectedTipoServico,
        outros: outros,
        prioridade: selectedPrioridade,
        comentario: comentario,
        descricaoProduto: descricaoProduto,
<<<<<<< HEAD
        status: 'Novo',
        imageUri: imageUri, // isto deveria ser algo diferente?
        // status: status, selectedCliente
=======
        statusOS: 'Novo',
        imageUri: imageUri, // isto deveria ser algo diferente?
        // statusOS: statusOS, selectedCliente
>>>>>>> origin/components-Lara
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

<<<<<<< HEAD
  const listCliente = async () => {
    try {
      listUser(); // Obtém a lista de clientes
      // Resto do código...
    } catch (error) {
      console.error('Erro ao listar:', error);
    }
  };

  const selectImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    try {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.assets[0].uri };
          console.log(source);
          setselectImage(source);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };  
=======

 
>>>>>>> origin/components-Lara

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
<<<<<<< HEAD
    setStatus('Novo');
    setImageUri(null);
  };

  useEffect(() => {
    loadOS();
    listCliente()
  }, []);  

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

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
            {imageUri && ( <Image source={{ uri: imageUri }}style={{ width: 100, height: 100 }} />)}
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          
          <View style={styles.container}>
          <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>
  
=======
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



  
  const takePhoto = async () => {
    try {
    const cameraResp = await ImagePicker.launchCameraAsync({
      allowsEditing : true,
      mediaTypes : ImagePicker.MediaTypeOptions.All,
      quality: 1
    })

    if (!cameraResp.canceled) {
      const  {uri} = cameraResp.assets[0]

      const fileName = uri.split('/').pop()

      const uploadResp = await uploadToFirebase(  uri, fileName, (v) => 
      console.log(v)
      )
      console.log('upload: ', uploadResp);

     
      listFiles().then((listResp) => {
        const files = listResp.map((value) => {
          return {name : value.fullPath }
        })
        setFiles(files)
      })
      }
   
  }catch (e) {
    Alert.alert ('Erro ao carregar imagem: ' + e.messsage)
  }
  
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


  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
          
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          
          <View style={styles.container}>
          <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>
  
>>>>>>> origin/components-Lara
              <Text style={styles.text}>Cliente:</Text>
              <SelectList
              data={clientes}
              onSelect={(value) => setSelectedCliente(value)}
              defaultValue={cliente}
              setSelected={(value) => setSelectedCliente(value)}
                          placeholder="Selecione um cliente ou digite um novo"
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
<<<<<<< HEAD
        dropdownItemStyles={{ color: 'whitw' }}
=======
        dropdownItemStyles={{ color: 'white' }}
>>>>>>> origin/components-Lara
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
<<<<<<< HEAD
              <View style={styles.photoButtonContainer}>
                <TouchableOpacity onPress={selectImage} style={styles.photoButton}>
=======
              <View style={styles.photoButtonContainer} >
                <TouchableOpacity  style={styles.photoButton} onPress={takePhoto}>
>>>>>>> origin/components-Lara
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
<<<<<<< HEAD
});
=======
});
>>>>>>> origin/components-Lara
