import { View, Text } from "react-native";

const Details = ({ route }) => {
    const { osItem } = route.params 

    return (
        <View>
            <Text>ID: {osItem.id}</Text>
            <Text>Data: {osItem.data}</Text>
        
        </View>
    )
}

export default Details