import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import reactotron from 'reactotron-react-native';
import * as yup from 'yup';
import moment from 'moment';
import { not, isNil } from 'ramda';
import CreateProfileComponent from '../components/CreateProfileComponent';
import DropDownHolder from '../../helpers/DropDownHolder';
import { getCitiesByName, getCitieById } from '../../services/google-apis';
import ImagePicker from '../../assets/components/ImagePicker';

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

const switcherItemsMap = {
  0: 'name',
  1: 'birthdate',
  2: 'birthplaceDescription',
  3: 'imageSelection'
};

const onSelectCity = async props => {
  const {
    switcherRef,
    activeItemIndex,
    state,
    setState,
    id,
    setLoading,
    label,
    setShowCitiesModal
  } = props;
  const { setFieldValue } = switcherRef.current.formValues;
  setFieldValue(switcherItemsMap[activeItemIndex], label);
  setShowCitiesModal(false);
  await getCitieById({ placeId: id, setState, state, setLoading, label });
};

const onPressBack = ({ activeItemIndex, setActiveItemIndex }) => {
  const nextActiveItemIndex = activeItemIndex - 1;
  if (nextActiveItemIndex >= 0) {
    return setActiveItemIndex(nextActiveItemIndex);
  }
  return false;
};

const onSubmitSwitcherButton = ({
  activeItemIndex,
  switcherRef,
  setSearchCity,
  setActiveItemIndex,
  state,
  createProfile
}) => {
  const nextActiveItemIndex = activeItemIndex + 1;
  const itemsAmount = switcherRef.current.childrensAmount;
  const { errors, values } = switcherRef.current.formValues;
  const { birthdate, name } = values;
  const referencedInput = switcherItemsMap[activeItemIndex];
  const referencedInputValue = values[referencedInput];
  const referencedInputError = errors[referencedInput];

  if (referencedInputError) {
    return false;
  }
  if (activeItemIndex === 2 && not(isNil(state.birthplace.placeId))) {
    return setActiveItemIndex(1 + activeItemIndex);
  }
  if (activeItemIndex === 2 && referencedInputValue.length >= 4) {
    return setSearchCity(referencedInputValue);
  }
  if (nextActiveItemIndex < itemsAmount) {
    return setActiveItemIndex(1 + activeItemIndex);
  }
  if (activeItemIndex === 3) {
    reactotron.log(birthdate);
    if (state.file) {
      return createProfile({
        variables: {
          name,
          birthday: birthdate,
          file: state.file,
          input: {
            ...state.birthplace
          }
        }
      });
    }
    return DropDownHolder.show('error', '', 'Você deve selecionar uma imagem principal');
  }
  return false;
};

const getButtonSwitcherTitle = ({ activeItemIndex, state }) => {
  if (activeItemIndex === 2) {
    return state.birthplace.placeId ? 'Continuar' : 'Pesquisar';
  }
  if (activeItemIndex === 3) {
    return 'Pronto';
  }
  return 'Continuar';
};

const CreateProfileContainer = ({ navigation }) => {
  const [state, setState] = useState({
    birthday: null,
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
  const [loading, setLoading] = useState(false);

  const switcherRef = useRef(null);

  const { loading: queryLoading, data } = useQuery(GET_USER);
  const [createProfile, { loading: mutationLoading }] = useMutation(CREATE_PROFILE, {
    onCompleted: () => navigation.replace('Home'),
    onError: () => DropDownHolder.show('error', '', 'Falha ao criar perfil'),
    refetchQueries: [{ query: GET_USER, variables: { v: Math.random() } }]
  });

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

  const formInitialSchema = {
    name: 'Murilo',
    birthdate: '26/03/1994 11:45',
    birthplaceDescription: 'cacu'
  };

  useEffect(() => {
    if (searchCity.length >= 4) {
      getCitiesByName({ name: searchCity, setFindedCities, setShowCitiesModal, setLoading });
    }
  }, [searchCity]);

  const { user, profile } = data || {};

  return (
    <CreateProfileComponent
      isLoading={queryLoading || mutationLoading || loading}
      imageToUpload={state.avatar}
      formSchema={formSchema}
      formInitialSchema={formInitialSchema}
      date={state.birthday}
      showCitiesModal={showCitiesModal}
      activeItemIndex={activeItemIndex}
      switcherItemsMap={switcherItemsMap}
      onDismissCitiesModal={() => setShowCitiesModal(false)}
      onSubmitSwitcherButton={() =>
        onSubmitSwitcherButton({
          activeItemIndex,
          switcherRef,
          setSearchCity,
          setActiveItemIndex,
          state,
          createProfile
        })
      }
      switcherRef={switcherRef}
      onPressBack={() => onPressBack({ activeItemIndex, setActiveItemIndex })}
      modalDataCities={findedCities}
      onSelectCity={({ id, label }) =>
        onSelectCity({
          switcherRef,
          activeItemIndex,
          state,
          setState,
          id,
          setLoading,
          label,
          setShowCitiesModal
        })
      }
      onChangeDate={(_, selectedDate) => setState({ ...state, birthday: selectedDate })}
      onPressUpload={() => false}
      user={user}
      profile={profile}
      image={state.avatar}
      buttonSwitcherTitle={getButtonSwitcherTitle({ activeItemIndex, state })}
      onPressImagePicker={() =>
        ImagePicker.show(imagePickerOptions, {
          onError: () => DropDownHolder.show('error', '', 'Failed on select image'),
          onSuccess: ({ path, file }) => {
            setState({
              ...state,
              file,
              avatar: path.replace('file//', '')
            });
          }
        })
      }
    />
  );
};

export default CreateProfileContainer;
