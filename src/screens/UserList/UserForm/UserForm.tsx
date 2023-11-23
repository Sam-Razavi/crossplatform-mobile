import { View, Text, StyleSheet } from "react-native"
import { Button, Input } from '@rneui/themed';
import { useCreateUserMutation } from "../../../store/api/UserApi";
import { useState } from "react";
import { useToast } from 'react-native-toast-notifications'

export const UserForm = (props) => {
    const { navigation } = props

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [createUser] = useCreateUserMutation()
    const toast = useToast()


    const handleSubmit = () => {
        console.log('firstName: ', firstName)
        console.log('lastName: ', lastName)

        if (firstName === "" || lastName === "") {
            console.log('Invalid form!')
            toast.show("Please fill out all inputs", {
                type: "warning",
                placement: "top",
                duration: 4000,
                animationType: "slide-in",
              });
            return
        }

        createUser({
			user: {
				firstName: firstName,
				lastName: lastName,
			}
		}).then(() => {
			navigation.navigate('UserList')
			toast.show(`Användaren ${firstName} ${lastName} har skapats!`, {
				type: "success",
				placement: "top",
				duration: 4000,
				animationType: "slide-in",
			});
			setFirstName('')
			setLastName('')
		}).catch((error) => {
			toast.show(error, { type: "danger" })
		})
	}

    return (
        <View style={styles.parentContainer}>
        <View style={styles.container}>
            <Text>Create Your User</Text>
            <Input value={firstName} onChangeText={(text) => setFirstName(text)} placeholder="First name"></Input>
			<Input value={lastName} onChangeText={(text) => setLastName(text)} placeholder="Last name"></Input>
            <Button title="Create User" onPress={() => handleSubmit()}></Button>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentContainer:{
        flex: 1,
        backgroundColor: 'white',
        margin: 36,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center'
    }
})
