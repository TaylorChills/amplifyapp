import React, { useState, useEffect } from 'react';
import { Button, Grid, Heading, View } from '@aws-amplify/ui-react';
import { deleteBlog as deleteBlogMutation } from '../graphql/mutations';
import { createBlog as createBlogMutation } from '../graphql/mutations';
import { listBlogs } from '../graphql/queries';
import { /* uploadData, getUrl, */ remove } from 'aws-amplify/storage';

import CreateForm from '../components/CreateForm';
import BlogContainer from '../components/BlogContainer';

import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const Dashboard = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function createBlog(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get('name'),
    };
    await client.graphql({
      query: createBlogMutation,
      variables: { input: data },
    });
    event.target.reset();
  }

  async function fetchNotes() {
    const apiData = await client.graphql({ query: listBlogs });
    const blogsFromAPI = apiData.data.listBlogs.items;
    setBlogs(blogsFromAPI);
  }

  /* async function createNote(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get('image');
        const data = {
          name: form.get('name'),
          description: form.get('description'),
          image: image.name,
        };
        if (!!data.image)
          await uploadData({
            key: data.name,
            data: image,
          });
        await client.graphql({
          query: createNoteMutation,
          variables: { input: data },
        });
        fetchNotes();
        event.target.reset();
      } */

  async function deleteBlog({ id, name }) {
    const newNotes = blogs.filter((note) => note.id !== id);
    setBlogs(newNotes);
    await remove({ key: name });
    await client.graphql({
      query: deleteBlogMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className='App'>
      <Heading level={1}>My Notes App</Heading>
      <CreateForm
        submit={createBlog}
        buttonName={'Create Blog'}
        name={'name'}
      />
      <Heading level={2}>Current Notes</Heading>
      <View margin='3rem 0'>
        <Grid
          columnGap='0.5rem'
          rowGap='0.5rem'
          templateColumns='1fr 1fr 1fr'
          templateRows='1fr 1fr 1fr'
          alignItems='center'
          padding='1rem'
        >
          {blogs.map((blog) => (
            <BlogContainer deleteBlog={deleteBlog} blog={blog} />
          ))}
        </Grid>
      </View>
      <Button onClick={props.signOut}>Sign Out</Button>
    </View>
  );
};

export default Dashboard;
