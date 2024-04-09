import React from 'react';
import { View, Flex, TextField, Button } from '@aws-amplify/ui-react';

const CreateForm = (props) => {
  const { submit, buttonName } = props;

  return (
    <View as='form' margin='3rem 0' onSubmit={submit}>
      <Flex direction='row' justifyContent='center'>
        <TextField
          name='name'
          placeholder='Name'
          label='Name'
          labelHidden
          variation='quiet'
          required
        />

        <Button type='submit' variation='primary'>
          {buttonName}
        </Button>
      </Flex>
    </View>
  );
};

export default CreateForm;
