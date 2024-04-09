import React, { useState } from 'react';
import { View, Flex, Button, Text, TextField } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { updateBlog } from '../graphql/mutations';
import { Link } from 'react-router-dom';

const BlogContainer = (props) => {
  const [editName, setEditName] = useState('');

  const { blog, deleteBlog } = props;
  const client = generateClient();

  async function updateName({ id, name }) {
    await client.graphql({
      query: updateBlog,
      variables: { input: { id, name } },
    });
  }

  return (
    <View width='100%' height='12rem' border='1px solid black'>
      <Flex
        height={'100%'}
        alignItems={'center'}
        direction={'column'}
        justifyContent={'space-evenly'}
      >
        <Text>{editName}</Text>
        <Text as='strong' fontWeight={700}>
          {blog.name}
        </Text>

        <Flex direction={'row'} justifyContent={'center'}>
          <TextField
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Button onClick={() => updateName({ id: blog.id, name: editName })}>
            Edit Name
          </Button>
        </Flex>
        <Flex>
          <Link to={`/blog/${blog.id}`}>Open Blog</Link>

          <Button onClick={() => deleteBlog(blog)}>Delete Blog</Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default BlogContainer;
