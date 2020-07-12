import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as yup from 'yup';
import moment from 'moment';
import reactotron from 'reactotron-react-native';
import ProfileEditionComponent from '../components/ProfileEditionComponent';
import Icon from '../../assets/components/Icon';
import ImagePicker from '../../assets/components/ImagePicker';
import DropDownHolder from '../../helpers/DropDownHolder';
import { GET_PROFILE } from '../../graphQL/query';
import { ADD_PROFILE_IMAGE, REMOVE_PROFILE_IMAGE, EDIT_PROFILE } from '../../graphQL/mutation';
import { getCitiesByName } from '../../services/google-apis';

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

const onPressSugestion = async ({ sugestion, formRef, setSugestions }) => {
  formRef.current.setFieldValue('description', sugestion?.label);
  formRef.current.setFieldValue('birthplaceId', sugestion?.id);
  setSugestions(null);
};

const onChangeInput = async ({
  sugestions,
  setSugestions,
  text,
  isLoadingSugestions,
  setIsLoadingSugestions
}) => {
  if (text.length > 3 && !isLoadingSugestions) {
    setIsLoadingSugestions(true);

    const result = await getCitiesByName({ name: text });

    setSugestions(result);
    setIsLoadingSugestions(false);

    return true;
  }
  return false;
};

const ProfileEditionContainer = ({ navigation }) => {
  const formRef = useRef();
  const [sugestions, setSugestions] = useState(null);
  const [isLoadingSugestions, setIsLoadingSugestions] = useState(false);
  const {
    data: { profile },
    loading: loadingQuery
  } = useQuery(GET_PROFILE, {});
  reactotron.log(sugestions);
  const [editProfile, { loading: loadingMutationEdit }] = useMutation(EDIT_PROFILE, {
    onError: () => DropDownHolder.show('error', '', 'Falha ao salvar edição'),
    refetchQueries: [{ query: GET_PROFILE }]
  });

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
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() =>
            editProfile({
              variables: {
                ...formRef.current.values
              }
            })
          }
        >
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

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(4)
      .required('Seu nome nao pode conter menos de 4 caracteres'),
    birthdate: yup
      .string()
      .min(16, 'Ops! Digite data e hora de nascimento.')
      .test('TST', 'error', values => moment(values, 'DD/MM/YYYY HH:mm').isValid())
      .required('Digite uma data válida'),
    birthplaceDescription: yup.string()
  });

  return (
    <ProfileEditionComponent
      formInitialSchema={{
        ...profile,
        ...profile.birthplace,
        birthday: moment(Number(profile.birthday)).format('DD/MM/YYYY HH:mm')
      }}
      formRef={formRef}
      formSchema={formSchema}
      profile={profile}
      onPressSugestion={sugestion => onPressSugestion({ sugestion, formRef, setSugestions })}
      onChangeInput={text =>
        onChangeInput({
          text,
          sugestions,
          setSugestions,
          isLoadingSugestions,
          setIsLoadingSugestions
        })
      }
      sugestions={sugestions}
      loading={loadingQuery || loadingMutationAdd || loadingMutationRemove || loadingMutationEdit}
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
