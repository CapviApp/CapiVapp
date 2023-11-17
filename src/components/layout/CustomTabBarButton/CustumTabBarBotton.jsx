import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../../../constants/color';
import Svg, {Path} from 'react-native-svg';

const CustumTabBarBotton = props => {

   
    const {route, children, acessibilityState, onPress} = props

    if (acessibilityState) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.activeBtn}>
            <Text>{children}</Text>
            
            </TouchableOpacity>
        );
    } else {
        <TouchableOpacity onPress={onPress} style={styles.inactiveBtn}>
        <Text>{children}</Text>
        
        </TouchableOpacity>
    }
}

export default CustumTabBarBotton

const styles = StyleSheet.create({
    backgroundColor: COLORS.white,
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
});
