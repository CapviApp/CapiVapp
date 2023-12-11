import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , TouchableOpacity} from 'react-native';
import COLORS from '../../constants/color';
import { Feather, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons,FontAwesome,AntDesign,} from '@expo/vector-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase';
import Button from '../../components/Button';

export default function Config() {
  const handleLogout = async ()=>{
    await signOut(auth);
}

  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.white,}}>
    <View style={styles.container}>
      
      <Text style={styles.title}>Configurações</Text>
      <View>
        
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <AntDesign name="logout" size={24} color="white" />
          <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </View>
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#B22222',
    width: '80%',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#B22222',
    paddingBottom: 16,
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 500,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
  },
});
