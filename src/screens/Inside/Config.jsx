import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function Config() {
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    try {
      await signOut(auth); // Utilizando o 'auth' corretamente aqui
      navigation.navigate('login'); // Navegando para a tela de login após deslogar
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Configurações</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <AntDesign name="logout" size={24} color="white" />
            <Text style={styles.textButton}>Sair</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom:20,
    marginTop: 50,

  },
  button: {
    backgroundColor: '#B22222',
    width: '80%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#B22222',
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
  },
});
