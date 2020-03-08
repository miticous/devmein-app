import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ImagePicker from 'react-native-image-picker';
import reactotron from 'reactotron-react-native';
import * as yup from 'yup';
import moment from 'moment';
import CreateProfileComponent from '../components/CreateProfileComponent';
import DropDownHolder from '../../helpers/DropDownHolder';
import { getCitiesByName } from '../../services/google-apis';

const GET_USER = gql`
  query {
    user {
      name
    }
    profile {
      images {
        _id
        image
      }
    }
  }
`;

const CREATE_PROFILE = gql`
  mutation($file: String, $name: String, $birthday: String, $input: BirthplaceInput) {
    createProfile(file: $file, name: $name, birthday: $birthday, input: $input) {
      _id
      images {
        _id
        image
      }
    }
  }
`;

const switcherItemsMap = {
  0: 'name',
  1: 'birthdate',
  2: 'birthplaceDescription'
};

const CreateProfileContainer = ({ navigation }) => {
  const [state, setState] = useState({
    birthday: new Date(),
    file: null,
    avatar: undefined,
    birthplace: {
      placeId: null,
      description: null,
      lat: null,
      lng: null
    }
  });

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [searchCity, setSearchCity] = useState('');
  const [findedCities, setFindedCities] = useState([]);
  const [showCitiesModal, setShowCitiesModal] = useState(false);

  const switcherRef = useRef(null);

  const { loading: queryLoading, data } = useQuery(GET_USER);
  const [createProfile, { loading: mutationLoading }] = useMutation(CREATE_PROFILE, {
    onCompleted: () => navigation.replace('Home'),
    onError: () => DropDownHolder.show('error', '', 'Falha ao criar perfil'),
    refetchQueries: [{ query: GET_USER, variables: { v: Math.random() } }]
  });

  const options = {
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

  const openPicker = () =>
    ImagePicker.showImagePicker(options, response => {
      const path = response.uri;
      if (response.didCancel) {
        return true;
      }
      if (response.error) {
        return true;
      }
      return setState({
        ...state,
        file: response.data,
        avatar: path.replace('file//', '')
      });
    });

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(4)
      .required('Seu nome nao pode conter menos de 4 caracteres'),
    birthdate: yup
      .string()
      .min(16, 'Ops! Digite data e hora de nascimento.')
      .test('TST', 'error', values => moment(new Date(values)).isValid())
      .required('Digite uma data válida'),
    birthplaceDescription: yup.string()
  });

  const formInitialSchema = {
    name: '',
    birthdate: '',
    birthplaceDescription: ''
  };

  useEffect(() => {
    if (searchCity.length >= 4) {
      getCitiesByName({ name: searchCity, setFindedCities, setShowCitiesModal });
    }
  }, [searchCity]);

  const { user, profile } = data || {};

  return (
    <CreateProfileComponent
      isLoading={queryLoading || mutationLoading}
      onPressSubmit={() =>
        createProfile({
          variables: {
            name: data.user.name,
            birthday: state.birthday,
            file: state.file,
            input: {
              ...state.birthplace
            }
          }
        })
      }
      formSchema={formSchema}
      formInitialSchema={formInitialSchema}
      date={state.birthday}
      onSelectBirthPlace={(
        { description, id },
        {
          geometry: {
            location: { lat, lng }
          }
        }
      ) =>
        setState({
          ...state,
          birthplace: { description, placeId: id, lat: lat.toString(), lng: lng.toString() }
        })
      }
      showCitiesModal={showCitiesModal}
      activeItemIndex={activeItemIndex}
      switcherItemsMap={switcherItemsMap}
      onDismissCitiesModal={() => setShowCitiesModal(false)}
      onSubmitItemButton={() => {
        const nextActiveItemIndex = activeItemIndex + 1;
        const itemsAmount = switcherRef.current.childrensAmount;
        const { error, value } = switcherRef.current.formValues[1];

        if (Object.keys(error).includes(switcherItemsMap[activeItemIndex])) {
          return false;
        }

        if (activeItemIndex === 2 && value[switcherItemsMap[activeItemIndex]].length >= 4) {
          reactotron.log('hEERE');
          return setSearchCity(value[switcherItemsMap[activeItemIndex]]);
        }
        if (nextActiveItemIndex < itemsAmount) {
          return setActiveItemIndex(1 + activeItemIndex);
        }
        return false;
      }}
      switcherRef={switcherRef}
      onPressBack={() => {
        const nextActiveItemIndex = activeItemIndex - 1;
        if (nextActiveItemIndex >= 0) {
          return setActiveItemIndex(nextActiveItemIndex);
        }
        return false;
      }}
      modalDataCities={findedCities}
      onChangeDate={(_, selectedDate) => setState({ ...state, birthday: selectedDate })}
      onPressUpload={() => openPicker()}
      user={user}
      profile={profile}
      image={state.avatar}
    />
  );
};

export default CreateProfileContainer;
