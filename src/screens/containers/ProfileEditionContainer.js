import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import ProfileEditionComponent from '../components/ProfileEditionComponent';
import Icon from '../../assets/components/Icon';
import ImagePicker from '../../assets/components/ImagePicker';
import DropDownHolder from '../../helpers/DropDownHolder';
import { GET_PROFILE } from '../../graphQL/query';
import { ADD_PROFILE_IMAGE, REMOVE_PROFILE_IMAGE } from '../../graphQL/mutation';

const imagePickerOptions = {
  title: 'Selecione uma foto',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true
  },
  takePhotoButtonTitle: 'Tirar foto',
  chooseFromLibraryButtonTitle: 'Escolher na galeria',
  cancelButtonTitle: 'Cancelar'
};

const ProfileEditionContainer = ({ navigation }) => {
  const {
    data: { profile },
    loading: loadingQuery
  } = useQuery(GET_PROFILE, {});

  const [addProfileImage, { loading: loadingMutationAdd }] = useMutation(ADD_PROFILE_IMAGE, {
    onError: () => DropDownHolder.show('error', '', 'Falha ao adicionar image'),
    refetchQueries: [{ query: GET_PROFILE }]
  });

  const [removeProfileImage, { loading: loadingMutationRemove }] = useMutation(
    REMOVE_PROFILE_IMAGE,
    {
      onCompleted: () => false,
      onError: () => DropDownHolder.show('error', '', 'Falha ao remover imagem'),
      refetchQueries: [{ query: GET_PROFILE }]
    }
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
          <Icon name="Save" width={40} height={40} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ paddingHorizontal: 20 }}>
          <Icon name="Close" width={40} height={40} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <ProfileEditionComponent
      profile={profile}
      loading={loadingQuery || loadingMutationAdd || loadingMutationRemove}
      onPressRemove={index =>
        removeProfileImage({
          variables: {
            imageId: profile?.images[index]._id
          }
        })
      }
      onPressImage={() =>
        ImagePicker.show(imagePickerOptions, {
          onError: () => DropDownHolder.show('error', '', 'Failed on select image'),
          onSuccess: ({ file }) =>
            addProfileImage({
              variables: {
                file
              }
            })
        })
      }
    />
  );
};

export default ProfileEditionContainer;
