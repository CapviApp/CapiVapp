import  { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Login, Welcome, SignUp, AlterarSenha, NovaSenha } from '../screens/outside'

const OutsideStack = createNativeStackNavigator()
export default function OutsideStackRoutes(){
    return (
        <NavigationContainer>
           
            <OutsideStack.Screen name='welcome' component={Welcome} />
            <OutsideStack.Screen name='login' component={Login} />
            <OutsideStack.Screen name='signUp' component={SignUp} />
            <OutsideStack.Screen name='alterar' component={AlterarSenha} />
            <OutsideStack.Screen name='novaSenha' component={NovaSenha} />
        </NavigationContainer>
    )}