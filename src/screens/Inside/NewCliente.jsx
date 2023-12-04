import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SectionList } from 'react-native';
import { doc, setDoc, collection, updateDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cliente() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [users, setUsers] = useState([]);
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCnpjValid, setIsCnpjValid] = useState(true);
  const [isTelefoneValid, setIsTelefoneValid] = useState(true);

  const userCollectionRef = collection(db, 'Cliente teste');

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
  const validarCPF = (cpf) => {
    if (cpf === '') return true;
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
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
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cnpj.length !== 14) return false;
  
    // Validação do primeiro dígito verificador
    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    let resto = soma % 11;
    if (parseInt(cnpj.charAt(12)) !== (resto < 2 ? 0 : 11 - resto)) return false;
  
    // Validação do segundo dígito verificador
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
  
  const formatarCPF = (valor) => {
    valor = valor.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
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
 
  const adicionar = () => {
    try {
      if (cpf && !validarCPF(cpf)) {
        console.log("CPF inválido");
        return;
      }
  
      if (cnpj && !validarCNPJ(cnpj)) {
        console.log("CNPJ inválido");
        return;
      }
      if (!validarEmail(email)) {
        console.log("E-mail inválido");
        return;
      }

      if (!email) {
        console.log("Email nao fornecido");
        return
      }
  
      setDoc(doc(userCollectionRef, email), {
        nome: username,
        email: email,
        cpf: cpf,
        cnpj: cnpj,
        telefone: telefone,
        endereco: endereco,
      }).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Salvo',
          text2: 'Cliente adicionado com sucesso!'
        });
        // Limpar os campos após a adição
        setUsername('');
        setEmail('');
        setCpf('');
        setCnpj('');
        setTelefone('');
        setEndereco('');
      }).catch((error) => {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível salvar'
        });
      });
    } catch (error) {
      console.error(error.message);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível salvar'
      });
    }
  };
  
  const listUser = async () => {
    try {
      const querySnapshot = await getDocs(userCollectionRef);
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userList);
      console.log('Clientes listados:', userList);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    try {
      const userDoc = await getDoc(doc(userCollectionRef, email));
      if (userDoc.exists()) {
        updateDoc(doc(userCollectionRef, email), {
          nome: username,
          cpf: cpf,
          cnpj: cnpj,
          telefone: telefone,
          endereco: endereco,
        }).then(() => {
          console.log('Cliente atualizado');
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log('Documento não encontrado para atualização');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  const deleteUser = () => {
    try {
      deleteDoc(doc(userCollectionRef, email)).then(() => {
        console.log('Cliente excluído');
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const data = [
    { title: 'Seção 1', data: [/* ...itens da seção 1... */] },
   
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
       
        <View>
          <View style={styles.inputContainer}>
          <Text style={styles.title}>Novo Cliente</Text>
            <TextInput placeholder="Nome:" onChangeText={(value) => setUsername(value)} style={styles.input} placeholderTextColor={color='white'}/>
            <TextInput placeholder="Email:"value={email}onChangeText={handleEmailChange} style={[styles.input, !isEmailValid && styles.inputError]}  placeholderTextColor='white'/>{!isEmailValid && <Text style={styles.errorText}>E-mail inválido</Text>}            
            <TextInput placeholder="CPF:"value={cpf}onChangeText={handleCpfChange}keyboardType="numeric"style={[styles.input, !isCpfValid && styles.inputError]}placeholderTextColor='white'/>{!isCpfValid && <Text style={styles.errorText}>CPF inválido</Text>}            
            <TextInput placeholder="CNPJ:"value={cnpj}onChangeText={handleCnpjChange} keyboardType="numeric"style={[styles.input, !isCnpjValid && styles.inputError]}placeholderTextColor='white'/>{!isCnpjValid && <Text style={styles.errorText}>CNPJ inválido</Text>}
            <TextInput placeholder="Telefone:"value={telefone}onChangeText={handleTelefoneChange}keyboardType="numeric"style={[styles.input, !isTelefoneValid && styles.inputError]}placeholderTextColor='white'/>{!isTelefoneValid && <Text style={styles.errorText}>Telefone inválido</Text>}
            <TextInput placeholder="Endereço:" onChangeText={(value) => setEndereco(value)} style={styles.input} placeholderTextColor={color='white'}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={adicionar} mode='contained' style={styles.button}>Salvar</Button>
          </View>
          {users.map((user, index) => (
            <View key={index}>
              <Text>Nome: {user.nome}</Text>
              <Text>Email: {user.email}</Text>
              <Text>CPF: {user.cpf}</Text>
              <Text>CNPJ: {user.cnpj}</Text>
              <Text>Número de Telefone: {user.telefone}</Text>
              <Text>Endereço: {user.endereco}</Text>
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
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  button:{
    marginBottom: 10,
    paddingVertical: 6,
    borderRadius: 30,
   
  },
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    marginVertical: 10,
    paddingStart: 10,
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#1A4963'
    
  },
  inputContainer: {
    paddingHorizontal: 15,
  }
});