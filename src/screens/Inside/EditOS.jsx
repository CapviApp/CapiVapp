import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function EditOS({ osList, selecionarOS}) {

    const [osListState, setOSList] = useState([]);
    const osCollectionRef = collection(db, 'teste');
    const navigation = useNavigation()

    const loadOS = async () => {
        try {
          const q = query(osCollectionRef);
          const querySnapshot = await getDocs(q);
          const osData = [];
          querySnapshot.forEach((doc) => {
            osData.push({ id: doc.id, ...doc.data() });
          });
          console.log('Dados carregados:', osData);
          setOSList(osData);
          return osData;
        } catch (error) {
          console.error('Erro ao carregar ordens de serviço:', error);
        }
      };
    
      const updateOS = async () => {
        try {
          const osQuery = query(osCollectionRef, where('cliente', '==', cliente));
          const osQuerySnapshot = await getDocs(osQuery);
    
          osQuerySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
              cliente: cliente,
              tipoHardware: tipoHardware,
              tipoServico: tipoServico,
              outros: outros,
              prioridade: prioridade,
              comentario: comentario,
              descricaoProduto: descricaoProduto,
              status: status,
            });
          });
    
          console.log('Atualização realizada com sucesso!');
          limparCampos();
          setEditMode(false);
          loadOS();
        } catch (error) {
          console.error('Erro ao atualizar:', error);
        }
      }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EditarOS</Text>
      
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
})