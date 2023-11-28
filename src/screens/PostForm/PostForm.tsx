// PostForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useToast } from 'react-native-toast-notifications';
import { useCreatePostMutation } from '../../store/api/PostsApi';

const PostForm = () => {
  const [postText, setPostText] = useState('');
  const [createPost, { isLoading }] = useCreatePostMutation();
  const toast = useToast();

  const loggedInUserId = useSelector((state: RootState) => state.auth.loggedInAs?.id);

  const handleSubmit = async () => {
    if (!postText.trim()) {
      toast.show("Post text cannot be empty", { type: "warning" });
      return;
    }

    if (!loggedInUserId) {
      toast.show("You must be logged in to create a post", { type: "warning" });
      return;
    }

    const newPost = {
      text: postText,
      createdBy: loggedInUserId,
      createdDate: new Date().toISOString(),
    };

    try {
      await createPost({ post: newPost }); 
      setPostText('');
      toast.show("Post created successfully", { type: "success" });
    } catch (error) {
      toast.show("Failed to create post", { type: "danger" });
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="post"
          value={postText}
          onChangeText={setPostText}
        />
        <Button title={isLoading ? 'Posting...' : 'Create Post'} onPress={handleSubmit} disabled={isLoading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default PostForm;
