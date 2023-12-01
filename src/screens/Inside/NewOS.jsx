
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SectionList } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Listar from '../components/ListarComponents';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';



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
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [status, setStatus] = useState('Novo');
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = React.useState({ value: "" });
  const [osList, setOSList] = useState([]);
  const [selectedTipoHardware, setSelectedTipoHardware] = useState('');
  const [selectedTipoServico, setSelectedTipoServico] = useState('');
  const [selectedPrioridade, setSelectedPrioridade] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCliente, setSelectedCliente] = useState('')
  
  const userCollectionRef = collection(db, 'Cliente teste');

  const [clientes, setClientes] = useState([])

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

  useEffect(() => {
    getNextOsId();
    loadOS();
  }, []);
  
  const adicionarOS = async () => {
    try {
      const dataAtualUTC = new Date();
      const dataAtualBrasilia = utcToZonedTime(dataAtualUTC, 'America/Sao_Paulo');
      const dataFormatada = format(dataAtualBrasilia, 'dd-MM-yyyy / HH:mm');
      
      if (!selectedCliente) {
        console.error('Erro: Cliente não selecionado');
        return;
      }
    
      //setStatus('Novo');
      const docRef = await addDoc(osCollectionRef, {
        data: dataFormatada,
        cliente: selectedCliente,
        tipoHardware: selectedTipoHardware, 
        tipoServico: selectedTipoServico,
        outros: outros,
        prioridade: selectedPrioridade,
        comentario: comentario,
        descricaoProduto: descricaoProduto,
        status: 'Novo', 
        //status: status,
      });

      const osId = docRef.id;
    
      alert(`Ordem de serviço cadastrada com sucesso! ID:` , osId);
      
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

  const listCliente = async () => {
    try {
      listUser(); // Obtém a lista de clientes
      // Resto do código...
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

  const limparCampos = () => {
    setCliente('');
    setTipoHardware('');
    setTipoServico('');
    setOutros('');
    setPrioridade('baixa');
    setComentario('');
    setDescricaoProduto('');
    setStatus('Novo');
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
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.container}>
          <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>
      
         
      
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
      
              <Text style={styles.text}>Status:</Text>
              <SelectList
                 data={[
                   { label: 'Novo', value: 'Novo' },
                               
                 ]}
                 onSelect={(value) => setStatus(value)}
                 defaultValue={status}
                 setSelected={setSelectedStatus}
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
              <View style={styles.buttonContainer}>
                <Button onPress={adicionarOS} mode='contained' style={styles.button}>Salvar</Button>
                <Button onPress={limparCampos} mode='contained' style={styles.buttonLast}>Cancelar</Button>
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
    widht: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: '25%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    
  },
  selectList: {
    backgroundColor: '#fff'
  },
   text: {
    color: 'white',
    paddingBottom: 5,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    paddingVertical: 4,
    paddingStart: 10,
    color: 'white',
  },
  button:{
    marginBottom: 10,
  },
  buttonLast: {
    marginBottom: 10, 
    marginStart: 130,
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row'
  },
});