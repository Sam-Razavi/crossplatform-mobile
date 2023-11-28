import { Input, Button } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import { useCreateUserMutation, useUpdateUserMutation } from "../../store/api/UsersApi";

export const UserForm = ({ route, navigation }) => {
  const lastNameRef = useRef(null);

  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const toast = useToast();


  useEffect(() => {
    if (route.params?.user) {
      setFirstName(route.params.user.firstName);
      setLastName(route.params.user.lastName);
    }
  }, [route.params?.user]);

  const handleSubmit = () => {
    if (firstName === "" || lastName === "") {
      toast.show("Please fill out all inputs", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }

    const user = {
      firstName,
      lastName,
    };

    if (route.params?.user) {

      updateUser({ user: { id: route.params.user.id, ...user } })
        .then(() => {
          navigation.navigate("UserList");
          toast.show(`User ${firstName} ${lastName} updated!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    } else {
      
      createUser({ user })
        .then(() => {
          navigation.navigate("UserList");
          toast.show(`User ${firstName} ${lastName} created!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          setFirstName("");
          setLastName("");
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>{route.params?.user ? "Edit your user" : "Create your user"}</Text>
          <Input
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            value={firstName}
            disabled={isCreating || isUpdating}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
          />
          <Input
            ref={lastNameRef}
            value={lastName}
            disabled={isCreating || isUpdating}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
          />
          <Button
            title={route.params?.user ? t("updateUser") : t("createUser")}
            disabled={isCreating || isUpdating}
            loading={isCreating || isUpdating}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
});
