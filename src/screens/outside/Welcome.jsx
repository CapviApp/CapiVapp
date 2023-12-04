import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import Button from '../../components/Button';


export default function Welcome({ navigation }) {



  return (
    <View style={styles.container}>
      <StatusBar  animated={true} style='light'
       />
      <ImageBackground source={require('./../../../assets/background.png')} style={styles.background}>

      <Image source={require('../../../assets/capibara.png')} style={styles.Image}/>
      <Text style={styles.title}>CapivApp</Text>
      <Text style={styles.subTitle}>Entre ou Cadastre-se</Text>
      <Button
        title='Login'
        onPress={() => navigation.navigate("login")}
        style={styles.button}
      />
      <Button
        title='Sign Up'
        onPress={() => navigation.navigate("signUp")}
        style={styles.button}
      />
       </ImageBackground>
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
    marginTop: -90
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  button:{
    width: '80%',
    marginBottom: 14,
  },
  background: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});