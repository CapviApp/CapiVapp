import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SectionList } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Listar from '../components/ListarComponents';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

function CustomSelectList({ data, onSelect, defaultValue, setSelected }) {
  const handleSelect = (value) => {
    onSelect(value);
    setSelected(value);
    console.log('oi to aqui', selected);

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
  
  const osCollectionRef = collection(db, 'teste');

  // Dados de exemplo para as seções
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
      console.log('Valor de selected em adicionarOS:', selected);

      //setStatus('Novo');
      const docRef = await addDoc(osCollectionRef, {
        data: dataFormatada,
        cliente: cliente,
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

      console.log('Ordem de serviço cadastrada com sucesso! ID da OS:', osId);
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
      console.log('Valor de2 selected em listOS:', selected);
  
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
  }, []);  

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}> 
    <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          
          <View style={styles.container}>
          <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>
      
          <Text style={styles.text}>ID da OS:</Text>
          <Text style={styles.text}>{osId}</Text>
      
          <Text style={styles.text}>Cliente:</Text>
          <TextInput
            placeholder="Selecione um cliente ou digite um novo"
            value={cliente}
            onChangeText={(text) => setCliente(text)}
            style={styles.input}
            placeholderTextColor={color='#ECECEC'}
          />
      
      <Text style={styles.text}>Tipo de Hardware:</Text>
      <SelectList
        data={[
          
          { label: 'Computador e Notebook', value: 'Computador e Notebook' },
          { label: 'Consoles', value: 'Consoles' },
          { label: 'Smartphones', value: 'Smartphones' },
          { label: 'TVs', value: 'TVs' },
          { label: 'Impressora', value: 'Impressora' },
        ]}
        onSelect={(value) => setTipoHardware(value)}
        defaultValue={tipoHardware}
        setSelected={(value) => setSelectedTipoHardware(value)}
        placeholder='Tipo Hardware'
        inputStyles={{ color: 'white'}}
        dropdownStyles={{ color: 'white', borderColor: 'white' }}
        dropdownItemStyles={{ color: 'white' }}
        dropdownTextStyles={{ color: 'white' }}
        boxStyles={{ borderColor: 'white' }}
        searchicon={<FontAwesome name="search" size={12} color={'white'} />}
        arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
        closeicon={<Ionicons name="close" size={24} color="white" />}
        
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
        placeholder='Tipo Serviço'
        inputStyles={{ color: 'white'}}
        dropdownStyles={{ color: 'white', borderColor: 'white' }}
        dropdownItemStyles={{ color: 'white' }}
        dropdownTextStyles={{ color: 'white' }}
        boxStyles={{ borderColor: 'white' }}
        searchicon={<FontAwesome name="search" size={12} color={'white'} />}
        arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
        closeicon={<Ionicons name="close" size={24} color="white" />}
      />
              <Text style={styles.text}>Outros:</Text>
              <TextInput
                placeholder="Comentários adicionais"
                value={outros}
                onChangeText={(text) => setOutros(text)}
                style={styles.input}
                placeholderTextColor={color='#ECECEC'}
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
                placeholder='Prioridade'
                inputStyles={{ color: 'white'}}
                dropdownStyles={{ color: 'white', borderColor: 'white' }}
                dropdownItemStyles={{ color: 'white' }}
                dropdownTextStyles={{ color: 'white' }}
                boxStyles={{ borderColor: 'white' }}
                searchicon={<FontAwesome name="search" size={12} color={'white'} />}
                arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
                closeicon={<Ionicons name="close" size={24} color="white" />}
              />
      
              <Text style={styles.text}>Comentário:</Text>
              <TextInput
                placeholder="Comentário da OS"
                value={comentario}
                onChangeText={(text) => setComentario(text)}
                style={styles.input}
                placeholderTextColor={color='#ECECEC'}
              />
      
              <Text style={styles.text}>Descrição do Produto:</Text>
              <TextInput
                placeholder="Descrição do produto"
                value={descricaoProduto}
                onChangeText={(text) => setDescricaoProduto(text)}
                style={styles.input}
                placeholderTextColor={color='#ECECEC'}
                
              />
      
              <Text style={styles.text}>Status:</Text>
              <SelectList
                 data={[
                   { label: 'Novo', value: 'Novo' },
                               
                 ]}
                  onSelect={(value) => setStatus(value)}
                  defaultValue={status}
                  setSelected={setSelectedStatus}
                  placeholder='Status'
                  inputStyles={{ color: 'white'}}
                  dropdownStyles={{ color: 'white', borderColor: 'white' }}
                  dropdownItemStyles={{ color: 'white' }}
                  dropdownTextStyles={{ color: 'white' }}
                  boxStyles={{ borderColor: 'white' }}
                  searchicon={<FontAwesome name="search" size={12} color={'white'} />}
                  arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />} 
                  closeicon={<Ionicons name="close" size={24} color="white" />}
                  searchPlaceholder={{ color: 'white' }}
              />
              <View style={styles.buttonContainer}>
                <Button mode='contained' onPress={adicionarOS} style={styles.button}>Salvar</Button>
                <Button mode='contained' onPress={limparCampos} style={styles.button}>Cancelar</Button>
              </View>
      
             
            </View>
        
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
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
  backgroundColor: {
    flex: 1,
    widht: '100%',
  },
  text: {
    color: 'white',
    paddingBottom: 5,
    paddingTop: 10,
  },
  input: {
    borderColor: 'white',
    color: 'white',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#ECECEC',
    paddingVertical: 5,
    
  },
  button: {
    marginBottom: 5,
  },
  buttonContainer: {
    paddingTop: 30,
  },
});