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

export const onPressImage = async ({ addProfileImage }) => {
  ImagePicker.show(imagePickerOptions, {
    onError: () => DropDownHolder.show('error', '', 'Failed on select image'),
    onSuccess: ({ file }) =>
      addProfileImage({
        variables: {
          file
        }
      })
  });
};

const updateSelectedTexts = ({ item, texts }) => {
  const isItemAlreadyAdded = texts?.some(text => text === item);

  if (isItemAlreadyAdded)
    return texts?.reduce((accumulator, text) => {
      if (text === item) {
        return accumulator;
      }

      return [...accumulator, text];
    }, []);

  return [...texts, item];
};

export const onPressTextsCardItem = ({ formRef, cardItem }) =>
  formRef?.current?.setValues({
    ...formRef.current.values,
    shownTexts: updateSelectedTexts({ item: cardItem, texts: formRef?.current?.values?.shownTexts })
  });

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

export const onPressSugestion = ({ sugestion, formRef, setSugestions, fieldRef }) => {
  if (fieldRef === 'birthplace.description') {
    formRef.current.setValues(
      {
        ...formRef.current.values,
        birthplace: {
          description: sugestion?.label,
          placeId: sugestion?.id
        }
      },
      true
    );

    setSugestions(null);

    return true;
  }

  if (fieldRef === 'graduation.description') {
    formRef.current.setValues(
      {
        ...formRef.current.values,
        graduation: {
          ...formRef.current.values.graduation,
          description: sugestion?.label,
          placeId: sugestion?.id
        }
      },
      true
    );

    setSugestions(null);

    return true;
  }

  if (fieldRef === 'residence.description') {
    formRef.current.setValues(
      {
        ...formRef.current.values,
        residence: {
          description: sugestion?.label,
          placeId: sugestion?.id
        }
      },
      true
    );

    setSugestions(null);

    return true;
  }

  if (fieldRef === 'sexualOrientation') {
    const sexualOrientations = formRef.current.values.sexualOrientations;

    const isSexualOrientationChecked = sexualOrientations?.some(
      orientation => orientation === sugestion?.id
    );

    if (isSexualOrientationChecked) {
      return formRef.current.setFieldValue('sexualOrientations', [
        ...sexualOrientations.filter(orientation => orientation !== sugestion?.id)
      ]);
    }

    return formRef.current.setFieldValue(
      'sexualOrientations',
      sexualOrientations?.length > 0 ? [...sexualOrientations, sugestion?.id] : [sugestion?.id]
    );
  }

  return formRef.current.setFieldValue(fieldRef, sugestion?.id);
};

export const onChangeInput = async ({ setSugestions, text, fieldRef, formRef, sugestions }) => {
  if (fieldRef === 'birthplace.description') {
    formRef.current.setFieldValue('birthplace.placeId', null);
  }

  if (fieldRef === 'graduation.description') {
    formRef.current.setFieldValue('graduation.placeId', null);
  }

  if (fieldRef === 'residence.description') {
    formRef.current.setFieldValue('residence.placeId', null);
  }

  if (text.length > 3) {
    const result = await getCitiesByName({
      name: text,
      type: fieldRef === 'graduation.description' ? 'establishment' : '(cities)'
    });

    setSugestions({ ...sugestions, [fieldRef]: result && result?.length > 0 ? result : null });

    return true;
  }

  return setSugestions({ ...sugestions, [fieldRef]: null });
};

export const onPressInputButton = ({ field, formRef }) =>
  formRef?.current?.setFieldValue(field, '');

const ProfileEditionContainer = ({ navigation }) => {
  const formRef = useRef();
  const [sugestions, setSugestions] = useState(null);

  const {
    data: { profile, user },
    loading: loadingQuery
  } = useQuery(GET_PROFILE, { fetchPolicy: 'cache-first' });

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
        .test('BIRTHPLACE_VALIDATION', 'error', () => {
          const { birthplace } = formRef?.current?.values;

          if (birthplace?.placeId) {
            return true;
          }

          return false;
        }),
      placeId: yup.string().required()
    }),
    graduation: yup.object().shape({
      description: yup
        .string()
        .min(3)
        .test('GRADUATION_VALIDATION', 'error', () => {
          const { graduation } = formRef?.current?.values;

          if (graduation?.description?.length === 0) {
            return true;
          }

          if (graduation?.placeId) {
            return true;
          }
          return false;
        })
    }),
    residence: yup.object().shape({
      description: yup
        .string()
        .min(3)
        .test('RESIDENCE_VALIDATION', 'error', () => {
          const { residence } = formRef?.current?.values;

          if (residence?.description?.length === 0) {
            return true;
          }

          if (residence?.placeId) {
            return true;
          }
          return false;
        })
    })
  });

  return (
    <ProfileEditionComponent
      formInitialSchema={{
        ...profile,
        birthday: moment(Number(profile.birthday))
          .utc()
          .format('DD/MM/YYYY HH:mm')
      }}
      user={user}
      onPressTextsCardItem={({ cardItem }) => onPressTextsCardItem({ cardItem, formRef })}
      formRef={formRef}
      formSchema={formSchema}
      profile={profile}
      onSubmitForm={() =>
        onSubmitForm({
          formRef,
          editProfile,
          navigation
        })
      }
      onPressSugestion={({ item, referencedInputName }) =>
        onPressSugestion({
          setSugestions: () => false,
          sugestion: item,
          fieldRef: referencedInputName,
          formRef
        })
      }
      onChangeInput={({ text, inputRef }) =>
        onChangeInput({
          text,
          setSugestions,
          inputRef,
          fieldRef: inputRef,
          formRef,
          sugestions
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
      onPressInputButton={field => onPressInputButton({ field, formRef })}
      onPressImage={() => onPressImage({ addProfileImage })}
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
