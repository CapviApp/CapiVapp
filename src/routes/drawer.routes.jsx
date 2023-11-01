import  { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { 
    Feather,
    SimpleLineIcons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome,
    AntDesign, 
} from '@expo/vector-icons'
import { Button, SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import User from '../../assets/user.jpeg'

import TabRoutes from './tab.routes'

import { Prioridade, Config, EsperaOs, Historico, Cliente, Profile } from '../screens/Inside'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes(){
    return (
        <Drawer.Navigator style={styles.container}
        screenOptions={{ 
            title: '', 
            drawerStyle:{
                width: 250,
                borderTopRightRadius: 40,
                backgroundColor: '#0B385B',
                marginTop: '8%'
            }, headerStyle: {
                backgroundColor: '#08354a'
            }, headerTintColor: '#FFF' ,
            drawerInactiveTintColor: '#FFF',
            drawerActiveTintColor: 'white',
    
            }} drawerContent={(props) => {
                return (
                    <SafeAreaView>
                        <View style={{
                            height: 200,
                            width: '100%',
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottomColor: "#f4f4f4",
                            borderBottomWidth: 1,
                            paddingTop: 50,
                           
                         }}>
                            <Image   
                                source={User}
                                style={{
                                height: 130,
                                width: 130,
                                borderRadius: 65,
                               
                    }}/>
                     <Text
                        style={{
                        fontSize: 22,
                        marginVertical: 6,
                        fontWeight: "bold",
                        color: "#FFF",
                        marginBottom: 30,
                        }}
                        >Lara Doe</Text>
                        </View>
                        <DrawerItemList {...props}/>
                    </SafeAreaView>
                )
            }}>
            <Drawer.Screen
                name='home'
                component={TabRoutes}
                options={{
                    drawerIcon:  () => <Feather name='home' style={styles.icon}/>,
                    drawerLabel: 'Home'
                   
                }}
            />
             <Drawer.Screen
                name='profile'
                component={Profile}
                options={{
                    drawerIcon:  ({ color, size }) => <Feather name='user' color={color} size={size}/>,
                    drawerLabel: 'Meu Perfil'
                }}
            />
              <Drawer.Screen
                name='config'
                component={Config}
                options={{
                    drawerIcon:  ({ color, size }) => <Feather name='settings' color={color} size={size}/>,
                    drawerLabel: 'Configuração'
                }}
                
            />
             <Drawer.Screen
                name='prioridade'
                component={Prioridade}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="exclamationcircleo" size={size} color={color} />,
                    drawerLabel: 'OS Prioritárias'
                }}
                
            />
            <Drawer.Screen
                name='empreraOs'
                component={EsperaOs}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="pausecircleo" size={size} color={color} />,
                    drawerLabel: 'Os Em Espera'
                }}
                
            />
            <Drawer.Screen
                name='historico'
                component={Historico}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="folderopen" size={size} color={color} />,
                    drawerLabel: 'Historico'
                }}
                
            />
             <Drawer.Screen
                name='clientes'
                component={Cliente}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="team" size={size} color={color} />,
                    drawerLabel: 'Clientes'
                }}
                
            />
             
          
        </Drawer.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '20%'
    },
    icon: {
        color: '#FFF',
        fontSize: 23
    }
})
