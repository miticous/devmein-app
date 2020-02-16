import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const CREATE_PROFILE = gql`
  mutation($file: String, $filename: String, $name: String, $birthday: String) {
    createProfile(file: $file, filename: $filename, name: $name, birthday: $birthday) {
      name
    }
  }
`;

const CreateProfileContainer = navigation => {
  const [state, setState] = useState({
    name: 'Murilo Andrade Medeiros',
    birthday: '07-03-1994 08:45:00',
    file: null,
    filename: null
  });
  const { name, birthday, file, filename } = state;
  const [createProfile, { data }] = useMutation(CREATE_PROFILE);
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  const picker = () =>
    ImagePicker.showImagePicker(options, response => {
      setState({ ...state, file: response.data, filename: response.fileName });
    });

  return (
    <>
      <Button onPress={() => picker()} title="Upload" />
      <Button
        onPress={async () => {
          await createProfile({
            variables: {
              name,
              birthday,
              file,
              filename: filename || 'Imagem.png'
            }
          });
        }}
        title="Submit"
      />
    </>
  );
};

export default CreateProfileContainer;
