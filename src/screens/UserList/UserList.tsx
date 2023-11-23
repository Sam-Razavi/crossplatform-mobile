import { View,Text, ScrollView } from "react-native"
import { useGetUsersQuery } from "../../store/api/UserApi"
import { ListItem } from '@rneui/themed';


const UserList = ({ navigation }) => {
    const { data, isLoading } = useGetUsersQuery({})

    console.log('data: ', data);
    return (
        <View>
            {isLoading ? <Text>loading...</Text> : (

                    <ScrollView>
                    {data.map((user) => (
                        <ListItem key={user.id} onPress={() => navigation.navigate('UserInfo', {user: user})}>
                        <ListItem.Content>
                            <ListItem.Title>{`${user.firstName} ${user.lastName}`}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    ))}
                    </ScrollView>
            )}
            <Text>UserList</Text>
        </View>
    )
}

export default UserList
