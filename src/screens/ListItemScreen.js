import React , {useState , useEffect} from 'react'
import { View, Text , FlatList ,StyleSheet , Linking , Platform } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
export default function ListItemScreen() {
    
    // const myItems = [
    //     {
    //         name:"iphone",
    //         desc:"I am selling this IPhone",
    //         Image:"https://media.istockphoto.com/photos/a-woman-holding-mobile-phone-with-blank-white-screen-with-coffee-cup-picture-id1251269460?b=1&k=20&m=1251269460&s=170667a&w=0&h=kg0vTEUORkaJjEDKwuz2rDqUMxJBLE4qgJgqSjxLTQw=",
    //         phone:"9876545678",
    //         year:"2013"
    //     },
    //     {
    //         name:"Camera",
    //         desc:"I am selling this Camera",
    //         Image:"https://media.istockphoto.com/photos/closeup-of-police-body-camera-picture-id1326757347?b=1&k=20&m=1326757347&s=170667a&w=0&h=-6nfo89mtH5D4iyzHvHtdvf6EbHh2fPQenEu98GpP9I=",
    //         phone:"9873455678",
    //         year:"2014"
    //     }
    // ]

  const [items , setItems] = useState([])

    const getDetails = async ()=>{
        const querySnap = await firestore().collection('ads').get()
        const result =  querySnap.docs.map(docSnap=>docSnap.data())
        // console.log(result)
        setItems(result)
      }

      const openDial = (phone) => {
          if(Platform.OS == 'android'){
            Linking.openURL(`tel:${phone}`)
          }
      }

      useEffect(()=>{
        getDetails()
        return ()=>{
          console.log("cleanup")
        }
      },[])

  const renderItem = (item) => {
      return (
        <Card style={styles.box1} >
        <Card.Title title={item.name}  />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: item.Image }} />
        <Card.Actions>
          <Button>{item.year}</Button>
          <Button onPress = {()=> openDial()} >call seller</Button>
          <Button>{item.price}</Button>
        </Card.Actions>
      </Card>
      )
  }


    return (
        <View style={styles.container} >
            <FlatList 
             data={items}
             keyExtractor={(item) => item.phone}
             renderItem={({item})=>
                 renderItem(item)
             } 
               />
        </View>
    )
}
const styles = StyleSheet.create({
    box1:{
       margin:10,
       elevation:3
    },
    container:{
        backgroundColor:'black'
    }
    
})