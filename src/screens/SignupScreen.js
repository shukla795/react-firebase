import React , {useState} from 'react'
import { View, Text , Image , StyleSheet ,KeyboardAvoidingView  , TouchableOpacity , Alert} from 'react-native'
import {TextInput , Button } from "react-native-paper"
import auth from '@react-native-firebase/auth';

export default function SignupScreen({navigation}) {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

     const usersignup = async()=> {
         if(!email || !password){
             Alert.alert("please fill all feilds")
             return
         }  

         try{
             const result = await  auth().createUserWithEmailAndPassword(email, password)
         }catch(err){
            Alert.alert("Something went wrong")
         }
     }

    return (
        <KeyboardAvoidingView behavior='position' >
            <View style={styles.box1}>
                 <Image style={{height:170,width:180 ,marginTop:15 }} source={require('../assests/login.png')} />
                 <Text style={{color:'white' , fontSize:15 }}>Please SignUp to continue!!!</Text>
            </View>
            <View style={styles.box2}>
            <TextInput
                label="Email"
                value={email}
                mode="outlined"
                onChangeText={text => setEmail(text)}
                />

            <TextInput
                label="Password"
                value={password}
                mode="outlined"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                />    

            <Button  mode="contained" onPress={() => usersignup() }>
                SignUp
            </Button>   
            <TouchableOpacity onPress={()=> navigation.goBack() } ><Text style={{textAlign:'center'}} >LogIN ? </Text></TouchableOpacity> 
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    box1:{
        alignItems:'center'
    },
    box2:{
        paddingHorizontal:30,
        height:'50%',
        justifyContent:'space-evenly'
    }
})