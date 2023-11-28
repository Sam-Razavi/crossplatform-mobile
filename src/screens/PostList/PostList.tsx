// PostList.tsx
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useGetPostsQuery } from '../../store/api/PostsApi'; // Adjust the import path as necessary

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <Text>Loading posts...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.text}</Text>
            <Text style={styles.postInfo}>Posted by: {item.createdBy} on {item.createdDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  postText: {
    fontSize: 16,
  },
  postInfo: {
    fontSize: 12,
    marginTop: 5,
    color: 'grey',
  },
});

export default PostList;
