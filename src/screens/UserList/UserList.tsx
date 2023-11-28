import { View, Text, FlatList, Button } from "react-native";
import { useGetUsersQuery, useDeleteUserMutation } from "../../store/api/UsersApi";
import { ListItem } from '@rneui/themed';
import { useToast } from "react-native-toast-notifications";

const UserList = ({ navigation }) => {
    const { data, isLoading } = useGetUsersQuery({});
    const [deleteUser] = useDeleteUserMutation();
    const toast = useToast();

    const handleEditPress = (user) => {
        navigation.navigate('UserForm', { user });
    };

    const handleDeletePress = (userId) => {
        deleteUser(userId)
            .then(() => {
                toast.show(`User deleted successfully!`, {
                    type: "success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                });

            })
            .catch((error) => {
                toast.show(`Failed to delete user: ${error}`, {
                    type: "danger",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                });
            });
    };

    return (
        <View>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            bottomDivider
                            onPress={() => navigation.navigate('UserInfo', { user: item })}
                        >
                            <ListItem.Content>
                                <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                            </ListItem.Content>
                            <Button title="Edit" onPress={() => handleEditPress(item)} />
                            <Button title="Delete" onPress={() => handleDeletePress(item.id)} />
                        </ListItem>
                    )}
                />
            )}
        </View>
    );
};

export default UserList;
