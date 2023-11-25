import { Text } from "@rneui/themed"

export const UserInfo = ({ route }) => {
    console.log('route: ', route);
    const user = route?.params?.user
    return (
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
    )
}
