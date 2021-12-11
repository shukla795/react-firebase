import React from 'react'
import { View, Text } from 'react-native'
import auth from "@react-native-firebase/auth"
import { Button } from 'react-native-paper'
export default function AccountScreen() {
    return (
        <View>
            <Text>{auth().currentUser.email}</Text>
            <Button  mode="contained" onPress={() => auth().signOut()}>
                LogOut
            </Button>
        </View>
    )
}
