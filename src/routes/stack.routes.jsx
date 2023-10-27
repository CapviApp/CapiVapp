import  { createNativeStackNavigator } from '@react-navigation/native-stack'


import { Profile, Config, Prioridade, Cliente, EsperaOs, New, Settings, Historico, Home } from '../screens/Inside'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

export default function StackRoutes(){
    return (
    <NavigationContainer>
        <Stack.Navigator >

            <Stack.Screen
                name='homeScreen'
                component={Home}
            />

            <Stack.Screen
                name='perfil'
                component={Profile}
            />
            <Stack.Screen
                name='settings'
                component={Config}
            />
            <Stack.Screen
                name='prioridade'
                component={Prioridade}
            />
            <Stack.Screen
                name='espera'
                component={EsperaOs}
            />
            <Stack.Screen
                name='cliente'
                component={Cliente}
            />
            <Stack.Screen
                name='config'
                component={Settings}
            />
            <Stack.Screen
                name='new'
                component={New}
            />
            <Stack.Screen
                name='historico'
                component={Historico}
            />
        </Stack.Navigator>
        </NavigationContainer>
    )
}