import  { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile, Config, Prioridade, EditOS, ClientesList, EsperaOs, New, Historico, Home, OSIndividual, Fotos, Cliente, NewOS, NewCliente } from '../screens/Inside'
import { NavigationContainer } from '@react-navigation/native'
import DrawerRoutes from './drawer.routes'

const Stack = createNativeStackNavigator()

export default function StackRoutes(){
    return (

        <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name='drawerhome'
                component={DrawerRoutes}
            />

            <Stack.Screen
                name='perfil'
                component={Profile}
            />
            <Stack.Screen
                name='config'
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
                name="clientelist" 
                component={ClientesList} 
            />
            <Stack.Screen
                name="Cliente" 
                component={Cliente}
              />
                    
            <Stack.Screen
                name='new'
                component={New}
            />
            <Stack.Screen
                name='historico'
                component={Historico}
            />
             <Stack.Screen
                name='os'
                component={OSIndividual}
            />
            
             <Stack.Screen
                name='editOS'
                component={EditOS}
            />
             <Stack.Screen
                name='fotos'
                component={Fotos}
            />       

            <Stack.Screen
                name='newcliente'
                component={NewCliente}
            /> 
       
        </Stack.Navigator>
        </NavigationContainer>
    )
}