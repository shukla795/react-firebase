import React , {useState} from 'react'
import { View, Text , KeyboardAvoidingView , StyleSheet ,Alert  } from 'react-native'
import {TextInput , Button } from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from "@react-native-firebase/storage"

// import storage from '@react-native-firebase/storage';
export default function CreateAdScreen() {
    const [name , setName] = useState('')
    const [desc , setDesc] = useState('')
    const [year , setYear] = useState('')
    const [price , setPrice] = useState('')
    const [phone , setPhone] = useState('')
    const [image , setImage] = useState('')

    const postData = async ()=>{
    
        try{
            const {user : {uid} } = await auth().createUserWithEmailAndPassword(email , password)
            let downloadURL = null
            if(image){
                const splitPath = image.split('/')
                const imageName = splitPath[splitPath.length -1 ]
                const refrence = storage().ref(`${uid}/images/${imageName}`)
                const data = await refrence.putFile(image)
                downloadURL = await storage().ref(data.metadata.fullPath).getDownloadURL()
            }


              await firestore().collection('ads')
          .add({
              name,
              desc,
              year,
              price,
              phone,
              image:downloadURL,
              uid:uid
          })
          Alert.alert("posted you Ad!")
 
        }catch(err){
          Alert.alert("something went wrong.try again")
        }
        
    }
  
    function onClickPicture() {
        launchCamera(
            {mediaType:'photo'},
            (data)=> setImage(data.assets[0].uri)
        )
    }


    return (
        <View  style={styles.box1} >
            <Text style={{fontSize:20 , textAlign:'center' ,color:'black' }} >Create addvertisement</Text>
            <TextInput
                label="Ad title"
                value={name}
                mode="outlined"
                onChangeText={text => setName(text)}
                />
            <TextInput
                label="Describe What you want to sell"
                value={desc}
                mode="outlined"
                numberOfLines={2}
                multiline={true}
                onChangeText={text => setDesc(text)}
                />
            <TextInput
                label="Year of puchase "
                value={year}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setYear(text)}
                />  
            <TextInput
                label="Describe Price"
                value={price}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setPrice(text)}
                />          
            <TextInput
                label=" contact Number"
                value={phone}
                mode="outlined"
                keyboardType={'numeric'}
                onChangeText={text => setPhone(text)}
                />

            <Button icon="camera" mode="contained" onPress={() => onClickPicture()}>
                Upload Image
            </Button> 
            <Button     mode="contained" onPress={() => postData() }>
                Post
            </Button>       
        </View>
    )
}


const styles = StyleSheet.create({
    box1:{
        paddingHorizontal:20, 
        flex:1,
        justifyContent:'space-evenly',
        backgroundColor:'grey'
    }
    
})