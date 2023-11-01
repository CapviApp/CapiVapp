import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Feather } from '@expo/vector-icons'
import { View, Text, Platform, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Home, New, Profile, Historico, Cliente } from '../screens/Inside';
import COLORS from '../constants/color'

import CustumTabBarBotton from '../components/layout/CustomTabBarButton/CustumTabBarBotton';

const Tab = createBottomTabNavigator()


export default function TabRoutes(){
    return (
        <Tab.Navigator screenOptions={(route) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: COLORS.dark,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({color, size, focused}) => {
            let iconName;

            if (route.name === Home) {
              iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            } else if (route.name === Cliente) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === New) {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === Profile) {
              iconName = focused ? 'wallet' : 'wallet-outline';
            }else if (route.name === Historico) {
              iconName = focused
                ? 'md-notifications-sharp'
                : 'md-notifications-outline';
            }

            return <Icon name={iconName} size={22} color='black' />;
          }
        })}
         
          
          >
            <Tab.Screen 
                name='Home'
                style={styles.tabButton}
                component={Home}
                options={{
                  tabBarButton: props => <CustumTabBarBotton route="home" {...props} />,
                    
                }}
            />
            <Tab.Screen 
                name='cliente'
                component={Cliente}
                options={{
                  tabBarButton: props => <CustumTabBarBotton {...props} />,
                   
                }}
            />
            <Tab.Screen 
                name='new'
                component={New}
                options={{
                  tabBarButton: props => <CustumTabBarBotton {...props} />,
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
                           
                          </View>
                        );
                      },
                }}
            />
            <Tab.Screen 
                name='profile'
                component={Profile}
                options={{
                  tabBarButton: props => <CustumTabBarBotton {...props} />,
                    
                }}
            />
            <Tab.Screen 
                name='historico'
                component={Historico}
                options={{
                  tabBarButton: props => <CustumTabBarBotton {...props} />,
                   
                }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create ({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  },
})