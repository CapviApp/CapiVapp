import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SectionList } from 'react-native';
import { doc, setDoc, collection,getDocs, addDoc } from "firebase/firestore";
import firebase, { db } from '../../config/firebase';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

//teste
export default function Cliente() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCnpjValid, setIsCnpjValid] = useState(true);
  const [isTelefoneValid, setIsTelefoneValid] = useState(true);
  const [isCepValid, setIsCepValid] = useState(true);
  const [isNumeroValid, setIsNumeroValid] = useState(true)
  const [isCpfDuplicated, setIsCpfDuplicated] = useState(false);
  const [isCnpjDuplicated, setIsCnpjDuplicated] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);

  const userCollectionRef = collection(db, 'Clientes');

  const handleCpfChange = (value) => {
    const formattedValue = formatarCPF(value);
    setCpf(formattedValue);
    setIsCpfValid(validarCPF(formattedValue));
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    setIsEmailValid(validarEmail(value));
  };
  
  const handleCnpjChange = (value) => {
    const formattedValue = formatarCNPJ(value);
    setCnpj(formattedValue);
    setIsCnpjValid(validarCNPJ(formattedValue));
  };
  
  const handleTelefoneChange = (value) => {
    const formattedValue = formatarTelefone(value);
    setTelefone(formattedValue);
    setIsTelefoneValid(formattedValue.length === 15); 
  };
  const handleCepChange = (value) => {
    const formattedValue = formatarCEP(value);
    setCep(formattedValue);
    setIsCepValid(formattedValue.length === 8); 
  };

  const validarCPF = (cpf) => {
    if (cpf === '') return true;
    cpf = cpf.replace(/[^\d]+/g, ''); 
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  };
  
  const validarCNPJ = (cnpj) => {
    if (cnpj === '') return true;
    cnpj = cnpj.replace(/[^\d]+/g, ''); 
    if (cnpj.length !== 14) return false;
    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    let resto = soma % 11;
    if (parseInt(cnpj.charAt(12)) !== (resto < 2 ? 0 : 11 - resto)) return false;
    soma = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    resto = soma % 11;
    if (parseInt(cnpj.charAt(13)) !== (resto < 2 ? 0 : 11 - resto)) return false;
  
    return true;
  };

  const validarEmail = (email) => {
    const regex = /^[a-z]+([.-]?[a-z0-9]+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};
const validarCEP = (cep) => {
  const cepRegex = /^\d{5}-\d{3}$/;
  return cep.length === 9 && /^\d{5}-\d{3}$/.test(cep);
};

const validarNumero = (numero) => {
  const numeroRegex = /^\d+$/;
  return numero.length <= 5 && /^\d*$/.test(numero);
};
  
  const formatarCPF = (valor) => {
    valor = valor.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/\D/g, ""); 
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
  }
  const formatarCNPJ = (valor) => {
    valor = valor.replace(/\D/g, "").slice(0, 14);
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    return valor;
  };
  const formatarTelefone = (valor) => {
    valor = valor.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    return valor;
  };
  const formatarCEP = (valor) => {
    valor = valor.replace(/\D/g, "").slice(0, 8);
    if (valor.length >= 5) {
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    return valor;
  };
  const formataNumero =(valor) =>{
    valor = valor.replace(/\D/g, "");
    return valor.slice(0, 5);
    
  };
 
  const adicionar = async () => {
    try {
      const cpfPreenchido = cpf.trim() !== '';
      const cnpjPreenchido = cnpj.trim() !== '';
      const cpfIsValid = cpfPreenchido ? validarCPF(cpf) : true;
      const cnpjIsValid = cnpjPreenchido ? validarCNPJ(cnpj) : true;
      const emailIsValid = validarEmail(email);
      const clienteExiste = await verificarClienteExistente(email, cpf, cnpj);
      // Atualizar estados de validação
      setIsCpfValid(cpfIsValid);
      setIsCnpjValid(cnpjIsValid);
      setIsEmailValid(emailIsValid);
      setIsCpfDuplicated(clienteExiste && cpf);
      setIsCnpjDuplicated(clienteExiste && cnpj);
      setIsEmailDuplicated(clienteExiste && email);
  
      // Verificações
      if ((!cpfPreenchido && !cnpjPreenchido) || !cpfIsValid || !cnpjIsValid || !emailIsValid || clienteExiste) {
        Alert.alert("Erro", "Verifique os erros nos campos");
        setIsCpfValid(false);  // Definir como falso para mostrar borda vermelha
        setIsCnpjValid(false);  // Definir como falso para mostrar borda vermelha
        setIsEmailValid(false);  // Definir como falso para mostrar borda vermelha
        return;
      }
  
      await setDoc(doc(userCollectionRef, email), {
        nome: username,
        email: email,
        cpf: cpf,
        cnpj: cnpj,
        telefone: telefone,
        endereco: endereco,
        bairro: bairro,
        cep: cep,
        numero: numero
      });
      Toast.show({
        type: 'success',
        text1: 'Salvo',
        text2: 'Cliente adicionado com sucesso!'
      });
  
      setUsername('');
      setEmail('');
      setCpf('');
      setCnpj('');
      setTelefone('');
      setEndereco('');
      setBairro('');
      setCep('');
      setNumero('');
  
    } catch (error) {
      console.error(error.message);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível salvar'
      });
    }
  };
  
  const cancelarOperacao = () => {
  setUsername('');
  setEmail('');
  setCpf('');
  setCnpj('');
  setTelefone('');
  setEndereco('');
  setBairro('');
  setCep('');
  setNumero('');
  
  };
  
  //VERIFICA SE O CLIENTE JA EXITE NO BANCO DE DADOS ---------------------------------------------------------------------
  const verificarClienteExistente = async (email, cpf, cnpj) => {
    const querySnapshot = await getDocs(userCollectionRef);
    let existe = false;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email === email) {
        existe = true;
        setIsEmailDuplicated(true);
      } else {
        setIsEmailDuplicated(false);
      }
      if (cpf && data.cpf === cpf) {
        existe = true;
        setIsCpfDuplicated(true);
      } else {
        setIsCpfDuplicated(false);
      }
      if (cnpj && data.cnpj === cnpj) {
        existe = true;
        setIsCnpjDuplicated(true);
      } else {
        setIsCnpjDuplicated(false);
      }
    });
    return existe;
  }; 
  useFocusEffect(
    React.useCallback(() => {  
      return () => {  
        setUsername('');
        setEmail('');
        setCpf('');
        setCnpj('');
        setTelefone('');
        setEndereco('');
        setBairro('');
        setCep('');
        setNumero('');
        setIsCpfValid(true);
        setIsEmailValid(true);
        setIsCnpjValid(true);
        setIsTelefoneValid(true);
        setIsCepValid(true);
        setIsNumeroValid(true);
        setIsCpfDuplicated(false);
        setIsCnpjDuplicated(false);
        setIsEmailDuplicated(false);
      };
    }, [])
  );

  const data = [
    { title: 'Seção 1', data: [] },
   
  ];

  const renderItem = ({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#08354a', '#10456e', '#08354a']} style={styles.backgroundColor}>
     
    <SectionList
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
       
        <View style={styles.container}>
          <View style={styles.inputContainer}>
          <Text style={styles.title}>Novo Cliente</Text>
            <TextInput placeholder="Nome:" value={username}onChangeText={(value) => setUsername(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="Email:"value={email}onChangeText={handleEmailChange} style={[styles.input, !isEmailValid && styles.inputError]}  placeholderTextColor='white'/>{!isEmailValid && <Text style={styles.errorText}>E-mail inválido</Text>}{isEmailDuplicated && <Text style={styles.errorText}>E-mail já cadastrado</Text>}         
            <TextInput placeholder="CPF:"value={cpf}onChangeText={handleCpfChange}keyboardType="numeric"style={[styles.input, !isCpfValid && styles.inputError]}placeholderTextColor='white'/>{!isCpfValid && <Text style={styles.errorText}>CPF inválido</Text>}{isCpfDuplicated && <Text style={styles.errorText}>CPF já cadastrado</Text>}          
            <TextInput placeholder="CNPJ:"value={cnpj}onChangeText={handleCnpjChange} keyboardType="numeric"style={[styles.input, !isCnpjValid && styles.inputError]}placeholderTextColor='white'/>{!isCnpjValid && <Text style={styles.errorText}>CNPJ inválido</Text>}{isCnpjDuplicated && <Text style={styles.errorText}>CNPJ já cadastrado</Text>}
            <TextInput placeholder="Telefone:"value={telefone}onChangeText={handleTelefoneChange}keyboardType="numeric"style={[styles.input, !isTelefoneValid && styles.inputError]}placeholderTextColor='white'/>{!isTelefoneValid && <Text style={styles.errorText}>Telefone inválido</Text>}
            <TextInput placeholder="Endereço:" value={endereco}onChangeText={(value) => setEndereco(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="Bairro:"value={bairro}onChangeText={(value) => setBairro(value)} style={styles.input} placeholderTextColor={color='white'} />
          
            <View style={styles.row}>
        <TextInput
          placeholder="CEP:"
          value={cep}
          onChangeText={(value) => {
            const formattedValue = formatarCEP(value);
            setCep(formattedValue);
            setIsCepValid(validarCEP(formattedValue));
          }}
          keyboardType="numeric"
          style={[styles.input, styles.inputFlex, !isCepValid && styles.inputError]}
          placeholderTextColor='white'
        />
        {!isCepValid && <Text style={styles.errorTextRow}>CEP inválido</Text>}
        
        <TextInput
          placeholder="Nº:"
          value={numero}
          onChangeText={(value) => {
            setIsNumeroValid(validarNumero(value));
            setNumero(value);
          }}
          keyboardType="numeric"
          style={[styles.input, styles.inputFlex, !isNumeroValid && styles.inputError]}
          placeholderTextColor='white'
        />
        {!isNumeroValid && <Text style={styles.errorTextRow}>Número inválido</Text>}
      </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={adicionar} mode='contained' style={styles.button}>Salvar</Button>
            <Button onPress={cancelarOperacao} mode='contained' style={styles.button}>Cancelar</Button>
          
          </View>

          {users.map((user, index) => (
            <View key={index}>
              <Text>Nome: {user.nome}</Text>
              <Text>Email: {user.email}</Text>
              <Text>CPF: {user.cpf}</Text>
              <Text>CNPJ: {user.cnpj}</Text>
              <Text>Número de Telefone: {user.telefone}</Text>
              <Text>Endereço: {user.endereco}</Text>
              <Text>Bairro: {user.bairro}</Text>
              <Text>CEP: {user.cep}</Text>
              <Text>Numero: {user.numero}</Text>
              
            </View>
          ))}
        </View>
      
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    <Toast />
   </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: '23%',
    
  },
  title: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 5,
    marginTop:60,
    marginBottom:20,
  },
  button: {
    flex: 1, 
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)', 
    paddingVertical: 5, 
    paddingHorizontal: 20, 
    borderRadius: 40, 
    color: 'white',
    fontSize: 10, 
    backgroundColor: '#4604B1', 
    width: '45%',
    alignSelf: 'center', 
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5, 
    paddingTop: 20,

  },
  
  input:{
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)', 
    paddingVertical: 4, 
    paddingHorizontal: 20, 
    borderRadius: 30, 
    color: 'white',
    fontSize: 16, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    marginBottom: 15, 
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginTop: 30,
  },
  errorTextRow: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputFlex: {
    flex: 1, 
    marginHorizontal: 5, 
  },
  
});