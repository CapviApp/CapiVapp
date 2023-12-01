import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, LogBox } from "react-native";
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { salvarPost, atualizarPost, deletarPost } from "../../servicos/firestore";
import estilos from "./estilos";
import { entradas } from 'path/to/entradas';
import { alteraDados, escolherImagemDaGaleria, verificarItens } from "../../utils/comum";
import { IconeClicavel } from "../../componentes/IconeClicavel";
import { salvarImagem, deletarImagem } from "../../servicos/storage";
import uploadImagemPadrao from '../../assets/upload.jpeg';
import { MenuSelecaoInferior } from "../../componentes/MenuSelecaoInferior";
import { storage } from '../../firebase/storage'; // Importe apenas uma vez o módulo de storage.

LogBox.ignoreAllLogs();
/**
 * Salva uma imagem no armazenamento do Firebase e retorna a URL de download.
 *
 * @param {string} imagem - URL da imagem a ser salva.
 * @param {string} imagemNome - Nome da imagem.
 * @returns {Promise<string | null>} - URL de download da imagem ou null em caso de erro.
 */
export async function salvarImagem(imagem, imagemNome) {
  try {
    if (!imagem) {
      throw new Error("A imagem não foi fornecida.");
    }
    const downloadImagem = await fetch(imagem);
    const blobImagem = await downloadImagem.blob();
    const imagemRef = ref(storage, `posts/${imagemNome}.png`);
    await uploadBytes(imagemRef, blobImagem);
    const url = await getDownloadURL(imagemRef);
    return url;
  } catch (error) {
    console.error("Erro ao salvar a imagem:", error.message);
    return null;
  }
}/**
 * Deleta uma imagem do armazenamento do Firebase.
 * @param {string} postId - ID do post associado à imagem.
 * @returns {Promise<boolean>} - true se a exclusão for bem-sucedida, false em caso de erro.
 */
export async function deletarImagem(postId) {
  try {
    const refStorage = ref(storage, `posts/${postId}.png`);
    await deleteObject(refStorage);
    return true;
  } catch (error) {
    console.error("Erro ao deletar a imagem:", error.message);
    return false;
  }
}
export default function Post({ navigation, route }) {
  const [desabilitarEnvio, setDesabilitarEnvio] = useState(false);
  const { item } = route?.params || {};
  const [imagem, setImagem] = useState(item?.imagemUrl || null);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [post, setPost] = useState({
    titulo: item?.titulo || "",
    fonte: item?.fonte || "",
    descricao: item?.descricao || "",
    imagemUrl: item?.imagemUrl || null
  });
  async function salvar() {
    setDesabilitarEnvio(true);

    if (item) {
      if (!verificarItens(post.imagemUrl, imagem)) {
        await atualizarPostComImagem(item.id);
      }
      await atualizarPost(item.id, post);
      return navigation.goBack();
    } 
    const idPost = await salvarPost({
      ...post,
      imagemUrl: imagem ? '' : null
    });
    navigation.goBack();
    if (imagem !== null) {
      await atualizarPostComImagem(idPost);
    }
  }
  async function atualizarPostComImagem(idPost) {
    const url = await salvarImagem(imagem, idPost);
    await atualizarPost(idPost, {
      imagemUrl: url
    });
  }
  async function removerImagemPost() {
    if (!item) return;

    if (await deletarImagem(item.id)) {
      await atualizarPost(item.id, {
        imagemUrl: null
      });
      navigation.goBack();
    }
  }
  async function excluirPostCompleto() {
    if (!item) return;

    deletarPost(item.id);

    if (item.imagemUrl !== null) {
      deletarImagem(item.id);
    } 

    navigation.goBack();
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.containerTitulo}>
        <Text style={estilos.titulo}>{item ? "Editar post" : "Novo Post"}</Text>
        <IconeClicavel 
          exibir={!!item} 
          onPress={excluirPostCompleto}
          iconeNome="trash-2" 
        />
      </View>
      <ScrollView style={{ width: "100%" }}>
        {entradas?.map((entrada) => (
          <View key={entrada.id}>
            <Text style={estilos.texto}>{entrada.label}</Text>
            <TextInput
              value={post[entrada.name]}
              placeholder={entrada.label}
              multiline={entrada.multiline}
              onChangeText={(valor) => 
                alteraDados(
                  entrada.name, 
                  valor, 
                  post, 
                  setPost
                )
              }
              style={
                [estilos.entrada, entrada.multiline && estilos.entradaDescricao]
              }
            />
          </View>
        ))}

        <TouchableOpacity 
          style={estilos.imagem}
          onPress={() => setMostrarMenu(true)}
        >
          <Image 
            source={imagem ? { uri: imagem} : uploadImagemPadrao}
            style={estilos.imagem}
          />
        </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity style={estilos.botao} onPress={salvar} disabled={desabilitarEnvio}>
        <Text style={estilos.textoBotao}>Salvar</Text>
      </TouchableOpacity>
      <MenuSelecaoInferior setMostrarMenu={setMostrarMenu} mostrarMenu={mostrarMenu}>
        <TouchableOpacity style={estilos.opcao} onPress={() => escolherImagemDaGaleria(setImagem)}>
          <Text>Adicionar foto</Text>
          <Text> &#128247;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.opcao} onPress={removerImagemPost}>
          <Text>Remover foto</Text>
          <Text> &#128465;</Text>
        </TouchableOpacity>
      </MenuSelecaoInferior>
    </View>
  );
}