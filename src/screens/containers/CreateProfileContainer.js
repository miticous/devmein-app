import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as yup from 'yup';
import moment from 'moment';
import { not, isNil } from 'ramda';
import reactotron from 'reactotron-react-native';
import CreateProfileComponent from '../components/CreateProfileComponent';
import DropDownHolder from '../../helpers/DropDownHolder';
import { getCitiesByName, getCitieById } from '../../services/google-apis';
import ImagePicker from '../../assets/components/ImagePicker';
import Icon from '../../assets/components/Icon';
import { onChangeInput, onPressSugestion, onPressInputButton } from './ProfileEditionContainer';

const CREATE_PROFILE = gql`
  mutation(
    $file: String!
    $name: String!
    $birthday: String!
    $input: BirthplaceInput!
    $genre: String
    $searchGenre: String!
  ) {
    createProfile(
      file: $file
      name: $name
      birthday: $birthday
      input: $input
      genre: $genre
      searchGenre: $searchGenre
    ) {
      _id
      images {
        _id
        image
      }
    }
  }
`;

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

const onSubmitForm = ({ formRef, activeItemIndex, setActiveItemIndex, switcherRef }) => {
  if (activeItemIndex !== switcherRef?.current?.childrensAmount) {
    return setActiveItemIndex(activeItemIndex + 1);
  }
  return false;
};

const CreateProfileContainer = ({ navigation }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sugestions, setSugestions] = useState(null);

  const formRef = useRef();
  const switcherRef = useRef();
  reactotron.log(formRef?.current?.values);
  const [createProfile, { loading: mutationLoading }] = useMutation(CREATE_PROFILE, {
    onCompleted: () => navigation.replace('Home'),
    onError: () => DropDownHolder.show('error', '', 'Falha ao criar perfil')
  });

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(4)
      .required('Seu nome nao pode conter menos de 4 caracteres'),
    eye: yup.string().min(3),
    occupation: yup.string().min(4),
    birthday: yup.string().when('_', {
      is: () => activeItemIndex > 2,
      then: yup
        .string()
        .min(16, 'Ops! Digite data e hora de nascimento.')
        .test('TST', 'error', values => moment(values, 'DD/MM/YYYY HH:mm').isValid())
        .required('Digite uma data válida')
    }),
    birthplace: yup.object().shape({
      placeId: yup.string(),
      description: yup.string().when('placeId', {
        is: val => val?.length > 0 || activeItemIndex > 2,
        then: yup.string().required(),
        otherwise: yup
          .string()
          .min(3)
          .test('RESIDENCE_VALIDATION', 'error', () => {
            const { birthplace } = formRef?.current?.values;

            if (!birthplace?.placeId && birthplace?.description?.length > 0) {
              return false;
            }

            return true;
          })
      })
    }),
    graduation: yup.object().shape({
      placeId: yup.string(),
      description: yup
        .string()
        .min(3)
        .test('RESIDENCE_VALIDATION', 'error', () => {
          const { graduation } = formRef?.current?.values;

          if (!graduation?.placeId && graduation?.description?.length > 0) {
            return false;
          }

          return true;
        })
    }),
    residence: yup.object().shape({
      placeId: yup.string(),
      description: yup
        .string()
        .min(3)
        .test('RESIDENCE_VALIDATION', 'error', () => {
          const { residence } = formRef?.current?.values;

          if (!residence?.placeId && residence?.description?.length > 0) {
            return false;
          }

          return true;
        })
    }),
    genre: yup.string()
  });

  const formInitialSchema = {
    name: 'Murilo',
    birthdate: '07/03/1994 11:45',
    birthplaceDescription: 'cacu',
    genre: null,
    searchGenre: null
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <>
          {activeItemIndex > 0 && (
            <TouchableOpacity
              onPress={() => setActiveItemIndex(activeItemIndex - 1)}
              style={{ paddingHorizontal: 20 }}
            >
              <Icon name="Back" width={40} height={40} />
            </TouchableOpacity>
          )}
        </>
      )
    });
  }, [activeItemIndex]);

  return (
    <CreateProfileComponent
      formRef={formRef}
      onSubmitForm={() =>
        onSubmitForm({ formRef, activeItemIndex, setActiveItemIndex, switcherRef })
      }
      onChangeInput={({ inputRef, text }) =>
        onChangeInput({ fieldRef: inputRef, setSugestions, text, formRef, sugestions })
      }
      isLoading={mutationLoading}
      sugestions={sugestions}
      onPressSugestion={({ item, referencedInputName }) =>
        onPressSugestion({
          setSugestions: () => false,
          sugestion: item,
          fieldRef: referencedInputName,
          formRef
        })
      }
      onPressInputButton={field => onPressInputButton({ formRef, field })}
      formSchema={formSchema}
      formInitialSchema={formInitialSchema}
      activeItemIndex={activeItemIndex}
      switcherRef={switcherRef}
      onPressSwitcherButton={() => formRef.current.submitForm()}
      onPressUpload={() => false}
    />
  );
};

export default CreateProfileContainer;
