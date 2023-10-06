import React from "react";
import { View,Text, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window')

const ListaHorizontal = ({data}) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => String(item)}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={[... Array(data.length)].map(
                (x,i)=> i * (width*0.8-40)+ (i-1)*40,
                 )}
            horizontal 
            snapToAlignment={"start"}
            scrollEventThrottle={16}
            decelerationRate="fast"
            style={{marginTop: 20}}
            renderItem={({item}) =>( 
            <View 
                style={{
                backgroundColor: item,
                height: width / 2.6,
                width: width * 0.8 - 20,
                justifyContent: 'center',
                marginHorizontal: 10,
                borderRadius: 12,
                marginBottom: '10%',
                 }}>
                    <View style={styles.container}>
                        <Text 
                            style={styles.title}>
                                CapiGame
                        </Text>
                    </View>
                </View>
            )}
        />
    )
}

export default ListaHorizontal

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        alignItems: 'center',
        fontFamily: 'sans-serif-light'
    }
})