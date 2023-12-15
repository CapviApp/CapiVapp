import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';

export default function Fotos({ route }) {
  const osId = route.params?.osId; 
  const [images, setImages] = useState([]); // Armazenará múltiplas imagens
  const storage = getStorage();
  const imagesRef = ref(storage, `os/${osId}/images`);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions()
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [selectedImage, setSelectedImage] = useState(null); // Estado para armazenar a imagem selecionada

  const navigateToFotos = (osId) => {
    navigation.navigate("Fotos", { osId });
  };
//teste
  // Função atualizada para escolher imagem da galeria
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    // Processo de upload
    const image = result.assets[0]; // Acesse a imagem pelo array 'assets'
    const imageName = image.uri.split('/').pop();
    const imageRef = ref(storage, `os/${osId}/images/${imageName}`);
    const response = await fetch(image.uri);
    const blob = await response.blob();

    uploadBytes(imageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImages((prevImages) => [...prevImages, downloadURL]);
        Alert.alert('Imagem adicionada com sucesso!');
      });
    }).catch((e) => {
      console.log(e);
      Alert.alert('Erro ao fazer upload da imagem.');
    });
  }
};

// Função atualizada para tirar uma nova foto
const takePhoto = async () => {
  let cameraResp = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!cameraResp.cancelled) {
    const image = cameraResp.assets[0]; // Acesse a imagem pelo array 'assets'
    const imageName = image.uri.split('/').pop();
    const imageRef = ref(storage, `os/${osId}/images/${imageName}`);
    const response = await fetch(image.uri);
    const blob = await response.blob();

    uploadBytes(imageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImages((prevImages) => [...prevImages, downloadURL]);
        Alert.alert('Foto adicionada com sucesso!');
      });
    }).catch((e) => {
      console.log(e);
      Alert.alert('Erro ao fazer upload da foto.');
    });
  }
};

  
  const renderImages = () => {
    return images.map((imgUri, index) => (
      <TouchableOpacity key={index} onPress={() => {setSelectedImage(imgUri); setModalVisible(true);}}>
        <Image source={{ uri: imgUri }} style={styles.image} />
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    // Função para buscar as imagens do Firestore
    const fetchImages = async () => {
      const imagesListRef = ref(storage, `os/${osId}/images`);
      listAll(imagesListRef)
        .then(async (res) => {
          const imageUrls = await Promise.all(
            res.items.map((itemRef) => getDownloadURL(itemRef))
          );
          setImages(imageUrls);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    fetchImages();
  }, [osId]); // Dependência `osId` garante que as imagens serão recarregadas se o ID da OS mudar
  

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Fotos da OS: {osId}</Text>

        <ScrollView contentContainerStyle={styles.imagesContainer}>
          {renderImages()}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={{ uri: selectedImage }} style={styles.modalImage} />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle, { fontSize: 18 }]}>
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => navigateToFotos(item.id)}>

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Icon name="add-a-photo" size={24} color="#fff" style={styles.iconStyle} />
          <Text style={styles.btnText}>Adicionar Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
        <Icon name="add-a-photo" size={24} color="#fff" style={styles.iconStyle} />
          <Text style={styles.btnText}>Tire uma foto</Text>
        </TouchableOpacity>

        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingTop:50,
    marginBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoButton: {
    backgroundColor: '#4604B1', // Cor de fundo do botão
    paddingVertical: 12, // Espaçamento vertical dentro do botão
    paddingHorizontal: 77, // Espaçamento horizontal dentro do botão
    borderRadius: 20, // Bordas arredondadas
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, 
    marginTop: 7, 
    borderWidth: 1,
    borderColor: '#fff',
    paddingTop: 20,
    flexDirection: 'row', 
    justifyContent: 'space-evenly',

  },
  iconStyle: {
    marginRight: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#10456e',
    borderRadius: 20,
    padding: 10, // Reduzindo o preenchimento interno
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#fff',
  },
  
  modalImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    borderColor: '#fff',
    
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderColor: '#fff',
    padding: 15, // Aumentando o preenchimento do botão de fechar
    borderRadius: 10, // Arredondando as bordas do botão de fechar
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderColor: '#fff',
  },
});
