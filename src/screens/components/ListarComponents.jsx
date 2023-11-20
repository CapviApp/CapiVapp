import React from 'react';
import { FlatList, TouchableOpacity, View, Text, Button } from 'react-native';

function Listar({ osList, dadosItem }) {
  return (
    <FlatList
      data={osList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Hardware: {item.hardware}</Text>
            <Text>Serviço: {item.servico}</Text>
            <Text>Prioridade: {item.prioridade}</Text>
            {/* Exiba os dados do item do formulário */}
            <Text>Cliente: {dadosItem.cliente}</Text>
            <Text>Tipo de Hardware: {dadosItem.tipoHardware}</Text>
            <Text>Tipo de Serviço: {dadosItem.tipoServico}</Text>
            <Text>Outros: {dadosItem.outros}</Text>
            <Text>Prioridade: {dadosItem.prioridade}</Text>
            <Text>Comentário: {dadosItem.comentario}</Text>
            <Text>Descrição do Produto: {dadosItem.descricaoProduto}</Text>
            <Text>Status: {dadosItem.status}</Text>
            <Button title="Deletar" />
            <Button title="Atualizar" />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default Listar;
