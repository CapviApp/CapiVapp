import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {addDoc, collection,query, getDocs,updateDoc,deleteDoc,where,} from 'firebase/firestore';
import { db } from '../../config/firebase';
import {format,addHours,set,getUnixTime,} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz/esm';
import { ScrollView } from 'react-native-gesture-handler';
import Listar from '../components/ListarComponents';

export default function NewOS() {
  const [osId, setOsId] = useState(''); // Adicione o estado para o ID da OS

  const [cliente, setCliente] = useState('');
  const [tipoHardware, setTipoHardware] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [outros, setOutros] = useState('');
  const [prioridade, setPrioridade] = useState('baixa');
  const [comentario, setComentario] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [status, setStatus] = useState('Novo'); 
  const [editMode, setEditMode] = useState(false);
  const [osList, setOSList] = useState([]);

  const osCollectionRef = collection(db, 'teste');

  const getNextOsId = async () => {
    try {
      const q = query(osCollectionRef);
      const querySnapshot = await getDocs(q);
      const osCount = querySnapshot.size;
      const nextId = osCount + 1;//aqui ele ta fazendo a contagem
      setOsId(nextId.toString());
      //console.log('osId definido:', osId); // sla parece q ele substitui ou aparece tanto o id quando a contagem desse satanas
    } catch (error) {
      console.error('Erro ao obter o próximo ID da Ordem de Serviço:', error);
    }
  };

  useEffect(() => {
    getNextOsId();
  }, []);

  const adicionarOS = async () => {
    try {
      const dataAtualUTC = new Date();
      const dataAtualBrasilia = utcToZonedTime(dataAtualUTC, 'America/Sao_Paulo');
      const dataFormatada = format(dataAtualBrasilia, 'dd-MM-yyyy / HH:mm');//yyyy-MM-dd HH:mm:ssXXX'
  
      const docRef = await addDoc(osCollectionRef, {
        data: dataFormatada,
        cliente: cliente,
        tipoHardware: tipoHardware,
        tipoServico: tipoServico,
        outros: outros,
        prioridade: prioridade,
        comentario: comentario,
        descricaoProduto: descricaoProduto,
        status: status,
      });
  
      const osId = docRef.id;
  
      console.log('Ordem de serviço cadastrada com sucesso! ID da OS:', osId);
      limparCampos();
      loadOS();
    } catch (error) {
      console.error('Erro ao cadastrar ordem de serviço:', error);
    }
  }
  
  

  const updateOS = async () => {
    try {
      const osQuery = query(osCollectionRef, where('cliente', '==', cliente));
      const osQuerySnapshot = await getDocs(osQuery);

      osQuerySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          cliente: cliente,
          tipoHardware: tipoHardware,
          tipoServico: tipoServico,
          outros: outros,
          prioridade: prioridade,
          comentario: comentario,
          descricaoProduto: descricaoProduto,
          status: status,
        });
      });

      console.log('Atualização realizada com sucesso!');
      limparCampos();
      setEditMode(false);
      loadOS();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  }

  const deleteOS = async () => {
    try {
      const osQuery = query(osCollectionRef, where('cliente', '==', cliente));
      const osQuerySnapshot = await getDocs(osQuery);

      osQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log('Ordem de serviço excluída com sucesso!');
      limparCampos();
      loadOS();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }

  const listOS = async () => {
    try {
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
  }

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
  }

  const limparCampos = () => {
    setCliente('');
    setTipoHardware('');
    setTipoServico('');
    setOutros('');
    setPrioridade('baixa');
    setComentario('');
    setDescricaoProduto('');
    setStatus('Novo');
  }

  useEffect(() => {
    loadOS();
  }, []);

 
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Nova Ordem de Serviço (OS)</Text>

      <Text>ID da OS:</Text>{/**aqui ele exibe a contagem no começo, sempremicao de edicao */}
      <Text>{osId}</Text>

      <Text>Cliente:</Text>
      <TextInput placeholder="Selecione um cliente ou digite um novo" value={cliente} onChangeText={text => setCliente(text)} />

      <Text>Tipo de Hardware:</Text>
      <Picker selectedValue={tipoHardware} onValueChange={itemValue => setTipoHardware(itemValue)}>
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Opção 1" value="Opção 1" />
        <Picker.Item label="Opção 2" value="Opção 2" />
      </Picker>

      <Text>Tipo de Serviço:</Text>
      <Picker selectedValue={tipoServico} onValueChange={itemValue => setTipoServico(itemValue)}>
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Opção 1" value="Opção 1" />
        <Picker.Item label="Opção 2" value="Opção 2" />
      </Picker>

      <Text>Outros:</Text>
      <TextInput placeholder="Comentários adicionais" value={outros} onChangeText={text => setOutros(text)} />

      <Text>Prioridade:</Text>
      <Picker selectedValue={prioridade} onValueChange={itemValue => setPrioridade(itemValue)}>
        <Picker.Item label="Baixa" value="baixa" />
        <Picker.Item label="Média" value="média" />
        <Picker.Item label="Alta" value="alta" />
      </Picker>

      <Text>Comentário:</Text>
      <TextInput placeholder="Comentário da OS" value={comentario} onChangeText={text => setComentario(text)} />

      <Text>Descrição do Produto:</Text>
      <TextInput placeholder="Descrição do produto" value={descricaoProduto} onChangeText={text => setDescricaoProduto(text)} />

      <Text>Status:</Text>
      <Picker selectedValue={status} onValueChange={itemValue => setStatus(itemValue)} />

      {editMode ? (
        <Button onPress={updateOS} title='Atualizar' />
      ) : (
        <Button onPress={adicionarOS} title='Salvar' />
      )}

      <Button onPress={deleteOS} title='Deletar' />

      {editMode ? (
        <Button onPress={() => { limparCampos(); setEditMode(false); }} title='Cancelar' />
      ) : (
        <Button onPress={() => setEditMode(true)} title='Editar' />
      )}

      <Button onPress={listOS} title='Listar' />

      <Text style={styles.listTitle}>Lista de Ordens de Serviço:</Text>
      {/**O id da OS aparece com 'undefined para vizualizacao */}
     
        <Listar osList={osList}/>
    </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
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
};