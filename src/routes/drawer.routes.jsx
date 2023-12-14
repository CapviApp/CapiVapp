import React, { useState, useEffect } from 'react';
import  { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import {Feather,SimpleLineIcons,MaterialIcons,MaterialCommunityIcons,FontAwesome,AntDesign,} from '@expo/vector-icons'
import { Button, SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import User from '../../assets/user.jpeg'
import TabRoutes from './tab.routes'
import { Prioridade, Config, EsperaOs, Historico, Cliente, Profile, ClientesList, Fotos } from '../screens/Inside'
import useAuth from '../hooks/useAuth';

const Drawer = createDrawerNavigator()

export default function DrawerRoutes(){
    const { user } = useAuth();

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
                    <View style={styles.drawerHeader}>
                        <Image source={User} style={styles.profileImage} />
                        <Text style={styles.userName}>{user ? (user.displayName || user.email) : 'Usuário Desconhecido'}</Text>
                    </View>
                    <DrawerItemList {...props} />
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
                name='historico'
                component={Historico}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="folderopen" size={size} color={color} />,
                    drawerLabel: 'Historico'
                }}
                
            />
             <Drawer.Screen
                name='clientes'
                component={ClientesList}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="team" size={size} color={color} />,
                    drawerLabel: 'Lista de Clientes'
                }}
                
            />
              <Drawer.Screen
                name='foto'
                component={Fotos}
                options={{
                    drawerIcon:  ({ color, size }) => <AntDesign name="team" size={size} color={color} />,
                    drawerLabel: 'Lista de Fotos'
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
    },
    drawerHeader: {
        height: 200,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#f4f4f4",
        borderBottomWidth: 1,
        paddingTop: 50,
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 65,
    },
    userName: {
        fontSize: 15,
        marginVertical: 6,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 30,
    }

})