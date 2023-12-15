import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList, Touchable, TouchableOpacity} from "react-native";
import Details from "./Details";
import { addDoc, collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
//teste
const List =({navigation})=>{

    const [todos, setTodos] = useState<Todo[any]>([]);

    useEffect(()=>{
        const osRef = collection(FIREBASE_DB, 'os');
        const subscriber = onSnapshot(osRef,{
            next:(snapshot) =>{
                const todos = [];
                snapshot.docs.forEach(doc =>{
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setTodos(todos);
            },
            

        });
        return()=> subscriber();
    }, []);

    const navigateToDetails = (item) => {
        navigation.navigate("Details", { osItem: item });
      };

      const renderTodo = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        );
      };
    
    return(
        <View style={styles.container}>
            
            <View>
               {todos.length >0 &&(
                <View> 
                    <FlatList
                    data={todos}  
                    renderItem={renderTodo}   
                    keyExtractor={(todo) => todo.id}              
                    
                    /> 
                </View>
               )}
            </View>
           
        </View>
    )
}

export default List;

const styles = StyleSheet.create({
    container:{

    }

})