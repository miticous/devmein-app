import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as yup from 'yup';
import moment from 'moment';
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

const onSubmitForm = async ({ formRef, editProfile, navigation }) => {
  try {
    await editProfile({
      variables: {
        ...formRef.current.values
      }
    });

    return navigation.pop();
  } catch (error) {
    return false;
  }
};

const onPressSugestion = ({ sugestion, formRef, setSugestions, fieldRef }) => {
  if (fieldRef === 'birthplace.description') {
    formRef.current.setFieldValue('birthplace.placeId', sugestion?.id);
    formRef.current.setFieldValue('birthplace.description', sugestion?.label);

    setSugestions(null);

    return true;
  }

  if (fieldRef === 'graduation.description') {
    formRef.current.setFieldValue('graduation.placeId', sugestion?.id);
    formRef.current.setFieldValue('graduation.description', sugestion?.label);

    setSugestions(null);

    return true;
  }

  if (fieldRef === 'residence.description') {
    formRef.current.setFieldValue('residence.placeId', sugestion?.id);
    formRef.current.setFieldValue('residence.description', sugestion?.label);

    setSugestions(null);

    return true;
  }

  return false;
};

const onChangeInput = async ({ setSugestions, text, inputRef }) => {
  if (text.length > 3) {
    const result = await getCitiesByName({
      name: text,
      type: inputRef === 'graduation.description' ? 'establishment' : '%28cities%29'
    });

    setSugestions(result);

    return true;
  }
  return false;
};

const ProfileEditionContainer = ({ navigation }) => {
  const formRef = useRef();
  const [sugestions, setSugestions] = useState(null);

  const {
    data: { profile },
    loading: loadingQuery
  } = useQuery(GET_PROFILE, {});

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
          onPress={() => formRef.current.submitForm()}
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
    birthday: yup
      .string()
      .min(16, 'Ops! Digite data e hora de nascimento.')
      .test('TST', 'error', values => moment(values, 'DD/MM/YYYY HH:mm').isValid())
      .required('Digite uma data válida'),
    birthplace: yup.object().shape({
      description: yup
        .string()
        .min(3)
        .required()
        .test('BIRTHPLACE_VALIDATION', 'error', value => {
          const { birthplace } = formRef?.current?.values;

          if (
            birthplace?.placeId === profile?.birthplace?.placeId &&
            value !== profile?.birthplace?.description
          ) {
            return false;
          }

          return true;
        }),
      placeId: yup.string().required()
    }),
    graduation: yup.object().shape({
      description: yup
        .string()
        .min(3)
        .test('GRADUATION_VALIDATION', 'error', value => {
          const { graduation } = formRef?.current?.values;

          if (graduation?.description?.length === 0) {
            return true;
          }

          if (
            graduation?.placeId === profile?.graduation?.placeId &&
            value !== profile?.graduation?.description
          ) {
            return false;
          }
          return true;
        })
    }),
    residence: yup.object().shape({
      description: yup
        .string()
        .min(3)
        .test('RESIDENCE_VALIDATION', 'error', value => {
          const { residence } = formRef?.current?.values;

          if (residence?.description?.length === 0) {
            return true;
          }

          if (
            residence?.placeId === profile?.residence?.placeId &&
            value !== profile?.residence?.description
          ) {
            return false;
          }
          return true;
        })
    })
  });

  return (
    <ProfileEditionComponent
      formInitialSchema={{
        ...profile,
        birthday: moment(Number(profile.birthday)).format('DD/MM/YYYY HH:mm')
      }}
      formRef={formRef}
      formSchema={formSchema}
      profile={profile}
      onSubmitForm={() => onSubmitForm({ formRef, editProfile, navigation })}
      onPressSugestion={({ sugestion, ref }) =>
        onPressSugestion({ sugestion, formRef, setSugestions, fieldRef: ref })
      }
      onChangeInput={({ text, inputRef }) =>
        onChangeInput({
          text,
          setSugestions,
          inputRef
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
      onPressInputButton={field => formRef?.current?.setFieldValue(field, '')}
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

ProfileEditionContainer.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired
  }).isRequired
};

export default ProfileEditionContainer;
