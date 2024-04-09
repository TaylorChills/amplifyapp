import React, { useState, useEffect } from 'react';
import { View, Flex, Text } from '@aws-amplify/ui-react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { listPosts } from '../graphql/queries';
import CreateForm from '../components/CreateForm';
import { createPost as createPostMutation } from '../graphql/mutations';

const client = generateClient();

function Blog() {
  const [posts, setPosts] = useState([]);
  let { blogId } = useParams();

  useEffect(() => {
    fetchPosts(blogId);
  }, [blogId]);

  async function fetchPosts(blogId) {
    const filter = {
      filter: {
        blogID: {
          contains: blogId, // Make sure this matches the case in your GraphQL schema
        },
      },
      limit: 10, // Example: Adjust the limit as needed
    };

    const apiData = await client.graphql({
      query: listPosts,
      variables: filter,
    });
    const blogPosts = apiData.data.listPosts.items;

    if (blogPosts !== undefined) {
      setPosts(blogPosts);
    }
  }

  async function createPost(e, blogID) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      blogID: blogID,
      title: form.get('name'),
    };
    await client.graphql({
      query: createPostMutation,
      variables: { input: data },
    });
    e.target.reset();
  }

  return (
    <View>
      <h2>Blog ID: {blogId}</h2>
      <CreateForm
        buttonName={'Create Post'}
        name={'title'}
        submit={(e) => createPost(e, blogId)}
      />
      <Flex direction={'column'}>
        {posts.map((post) => {
          return (
            <View width='100%' height='12rem' border='1px solid black'>
              <Text>{post.title}</Text>
            </View>
          );
        })}
      </Flex>
    </View>
  );
}

export default Blog;
