import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Feather } from '@expo/vector-icons'
import { View, Text, Platform } from "react-native";
import {
    SimpleLineIcons,
    Fontisto,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
import { Home, New, Profile, Settings, Historico, Cliente } from '../screens/Inside';
import COLORS from '../constants/color'

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

export default function TabRoutes(){
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                          <SimpleLineIcons
                            name="home"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                        );
                      },
                }}
            />
            <Tab.Screen 
                name='cliente'
                component={Cliente}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                            name="team"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                        );
                      },
                }}
            />
            <Tab.Screen 
                name='new'
                component={New}
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
                              borderWidth: 2,
                              borderColor: COLORS.white,
                            }}
                          >
                            <Fontisto name="plus-a" size={24} color={COLORS.white} />
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
                          <MaterialIcons
                            name="person-outline"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
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
                          <MaterialIcons
                            name="book"
                            size={24}
                            color={focused ? COLORS.primary : COLORS.black}
                          />
                        );
                      },
                }}
            />

        </Tab.Navigator>
    )
}