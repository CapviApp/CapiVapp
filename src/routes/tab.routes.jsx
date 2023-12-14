import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Feather } from '@expo/vector-icons'
import { View, Text, Platform, StyleSheet, TouchableWithoutFeedback, Animated,  TouchableOpacity } from "react-native";
import {SimpleLineIcons,Fontisto, MaterialCommunityIcons, MaterialIcons,Entypo, } from "@expo/vector-icons";
import { Home, Profile, Historico, ClientesList, NewCliente, NewOS, Fotos } from '../screens/Inside';
import COLORS from '../constants/color'
import FabButton from '../components/FabButton';

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      backgroundColor: COLORS.white,
      headerShown: false 
    },
  };  
  animation = new Animated.Value(0)
    toggleMenu = () => {
       const toValue = this.open ? 0 : 1

       Animated.spring(this.animation, {
        toValue,
        friction: 6,
        useNativeDriver: true,
       }).start()

       this.open = !this.open;
    }

export default function TabRoutes({ navigation }){


  const cameraStyle = {
    transform: [
        {scale: this.animation},
        {
            translateY: this.animation.interpolate({
                inputRange: [0,1],
                outputRange: [0, -60]
            })
        }
    ]
}
const likeStyle = {
    transform: [
        {scale: this.animation},
        {
            translateY: this.animation.interpolate({
                inputRange: [0,1],
                outputRange: [0, -120]
            })
        }
    ]
}


const rotation = {
    transform: [
        {
            rotate: this.animation.interpolate({
                inputRange: [0,1],
                outputRange: ["0deg", "45deg"]
            })
        }
    ]
} 

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View
                          style= {{  marginLeft: Platform.OS == "ios" ? -10 : 30, }}
                        >
                          <SimpleLineIcons
                            name="home"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                          </View>
                        );
                      },
                }}
            />
            <Tab.Screen 
                name='cliente'
                component={ClientesList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View
                          style= {{  marginLeft: Platform.OS == "ios" ? -10 : 40, zIndex: 1,}}
                        >
                            <AntDesign
                            name="team"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                          </View>
                        );
                      },
                }}
            />
            <Tab.Screen   
             name='newos'
                component={NewOS}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: COLORS.blue,
                              height: Platform.OS == "ios" ? 10 : 10,
                              width: Platform.OS == "ios" ? 10 : 10,
                              top: Platform.OS == "ios" ? -10 : -20,
                              borderRadius: Platform.OS == "ios" ? 25 : 30,
                              marginLeft: Platform.OS == "ios" ? 20 : 20,
                              
                            }}
                          ></View>
                        );
                      },
                }}/>
            <Tab.Screen 
                name='newCliente'
                component={NewCliente}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: '#0B385B',
                              height: Platform.OS == "ios" ? 50 : 60,
                              width: Platform.OS == "ios" ? 50 : 60,
                              top: Platform.OS == "ios" ? -10 : -20,
                              borderRadius: Platform.OS == "ios" ? 25 : 30,
                              marginLeft: Platform.OS == "ios" ? -10 : -50,
                            }}
                          >
                            <TouchableWithoutFeedback onPress={() => navigation.navigate("newos")}>
                                <Animated.View style={[styles.button, styles.submenu, likeStyle]}> 
                                <MaterialCommunityIcons name="book-plus" size={20} color="#fff" />
                                </Animated.View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => navigation.navigate("newCliente")}>
                                <Animated.View style={[styles.button, styles.submenu, cameraStyle]} > 
                                <MaterialIcons name="person-add-alt-1" size={20} color="#fff" />
                                </Animated.View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={this.toggleMenu}>
                                <Animated.View style={[styles.button, styles.menu, rotation]}> 
                                  <AntDesign name="plus" size={24} color='#FFF'/>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      },
                }}
            />
            
            <Tab.Screen 
                name='profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View
                            style= {{  marginLeft: Platform.OS == "ios" ? -10 : -30, }}
                          >
                          <MaterialIcons
                            name="person-outline"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                          </View>
                        );
                      },
                }}
            />
            <Tab.Screen 
                name='historico'
                component={Historico}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <View
                          style= {{  marginLeft: Platform.OS == "ios" ? -10 : -30, }}
                        >
                          <MaterialIcons
                            name="book"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                          </View>
                        );
                      },
                }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      position: 'absolute',
     
  },
  button: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 60/2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowRadius: 10,
      shadowColor: '#00213B',
      shadowOpacity: 0.3,
      shadowOffset: {
          height: 10,
      },
      borderWidth: 1,
      borderColor: COLORS.white,
  },
  menu: {
      backgroundColor: '#00213b'
  },
  submenu: {
      width: 48,
      height: 48,
      borderRadius: 48 / 2,
      backgroundColor: '#00213b'
  },
})