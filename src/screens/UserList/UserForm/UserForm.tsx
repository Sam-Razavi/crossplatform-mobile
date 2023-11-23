import { View, Text, StyleSheet } from "react-native"
import { Button, Input } from '@rneui/themed';

export const UserForm = () => {

    const handleSubmit = () => {
        console.log('Clicked!');
    }

    return (
        <View style={styles.parentContainer}>
        <View style={styles.container}>
            <Text>Create Your User</Text>
            <Input placeholder="First name"></Input>
            <Input placeholder="Last name"></Input>
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
