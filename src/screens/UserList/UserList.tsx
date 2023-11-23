import { View,Text } from "react-native"
import { useGetUsersQuery } from "../../store/api/UserApi"
import { ListItem } from '@rneui/themed';

const UserList = () => {
    const { data, isLoading } = useGetUsersQuery({})

    console.log('data: ', data);
    return (
        <View>
            {isLoading ? <Text>loading...</Text> : (
                <View>
                    {data.map((user) => (
                        <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>{`${user.firstName} ${user.lastName}`}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    ))}

            </View>
            )}

            <Text>UserList</Text>
        </View>
    )
}

export default UserList
