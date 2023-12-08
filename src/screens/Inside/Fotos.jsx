import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../config/firebase'

export default function Fotos() {

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false) 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });
    const source = {uri: result.assets[0].uri}
    console.log(source)
    setImage(source)
}; 

const uploadImage = async (uri, name, onProgress) => {
  setUploading(true)
  const response = await fetch(image.uri)
  const blob = response.blob()
  const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
  var ref = firebase.storage().ref().child(filename).put(blob)
  try {
      await ref;
  } catch (e){
      console.log(e)
  }
  setUploading(false)
  Alert.alert(
      'Photo uploaded!'
  );
  setImage(null);
} 

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.btnText}>Pick an Image</Text> 
      </TouchableOpacity> 
      <View style={styles.imageContainer}>
      {image && <Image source={{uri: image.uri}} style={{width: 300, height: 300}}/>} 
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.btnText}>Upload Image</Text> 
      </TouchableOpacity> 
      </View> 
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectButton: {
    border: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'red',
    width: 120,
  },
  uploadButton: {
    border: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'blue',
    width: 120,
  }
})