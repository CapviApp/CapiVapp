import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import styles from './styles';
//teste
export default function ImageComponent() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            uploadImage(result.uri);
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const uploadTask = storage().ref().child('folderName/imageName.jpg').put(blob);

        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
            }, 
            error => {
                console.log(error);
            }, 
            () => {
                storage()
                    .ref("folderName")
                    .child("imageName.jpg")
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                    });
            }
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Text>Select Image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 5 }} />}
        </View>
    );
}