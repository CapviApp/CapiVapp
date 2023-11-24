import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list-expo';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Listar from '../components/ListarComponents';

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
    <View style={styles.container}>
    <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>

    <Text>ID da OS:</Text>
    <Text>{osId}</Text>

        <Text>Cliente:</Text>
        <TextInput
          placeholder="Selecione um cliente ou digite um novo"
          value={cliente}
          onChangeText={(text) => setCliente(text)}
        />

<Text>Tipo de Hardware:</Text>
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
  setSelected={(value) => setSelectedTipoHardware(value)}/>
  
<Text>Tipo de Serviço:</Text>
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
  dropdownTextStyles={{color: 'white'}}
/>
        <Text>Outros:</Text>
        <TextInput
          placeholder="Comentários adicionais"
          value={outros}
          onChangeText={(text) => setOutros(text)}
        />

        <Text>Prioridade:</Text>
        <SelectList
          data={[
            { label: 'Baixa', value: 'baixa' },
            { label: 'Média', value: 'média' },
            { label: 'Alta', value: 'alta' },
          ]}
          onSelect={(value) => setPrioridade(value)}
          defaultValue={prioridade}
          setSelected={setSelectedPrioridade}
        />

        <Text>Comentário:</Text>
        <TextInput
          placeholder="Comentário da OS"
          value={comentario}
          onChangeText={(text) => setComentario(text)}
        />

        <Text>Descrição do Produto:</Text>
        <TextInput
          placeholder="Descrição do produto"
          value={descricaoProduto}
          onChangeText={(text) => setDescricaoProduto(text)}
        />

        <Text>Status:</Text>
        <SelectList
           data={[
             { label: 'Novo', value: 'Novo' },
                         
           ]}
           onSelect={(value) => setStatus(value)}
           defaultValue={status}
           setSelected={setSelectedStatus}
        />

        <Button onPress={adicionarOS} title='Salvar' />
        <Button onPress={limparCampos} title='Cancelar' />
        <Button onPress={listOS} title='Listar' />

       
      </View>

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
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    
  },
});