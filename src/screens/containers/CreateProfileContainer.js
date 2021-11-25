import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as yup from 'yup';
import moment from 'moment';
import CreateProfileComponent from '../components/CreateProfileComponent';
import DropDownHolder from '../../helpers/DropDownHolder';
import Icon from '../../assets/components/Icon';
import {
  onChangeInput,
  onPressSugestion,
  onPressInputButton,
  onPressImage,
  onPressTextsCardItem,
} from './ProfileEditionContainer';
import {
  CREATE_PROFILE,
  ADD_PROFILE_IMAGE,
  REMOVE_PROFILE_IMAGE,
} from '../../graphQL/mutation';
import { GET_PROFILE_CREATION } from '../../graphQL/query';

const formInitialValues = {
  name: '',
  searchLoveAgeRange: [18, 26],
  searchFriendAgeRange: [18, 26],
};

const normalizeFormValues = ({ formRef, data }) => {
  const { profile, user } = data ?? {};

  formRef.current.setValues(
    {
      ...profile,
      ...user,
      birthplace: {
        placeId: profile?.birthplace?.placeId,
        description: profile?.birthplace?.description,
      },
      searchLoveGenre: user?.configs?.love?.genre,
      searchLoveAgeRange: user?.configs?.love?.range,
      searchFriendGenre: user?.configs?.friendShip?.genre,
      searchFriendAgeRange: user?.configs?.friendShip?.range,
      birthdate: moment(Number(profile?.birthday)).utc().format('DD/MM/YYYY'),
      birthtime: moment(Number(profile?.birthday)).utc().format('HH:mm'),
    },
    true,
  );
};

const convertToDateTimePattern = ({ date, time }) => `${date} ${time}`;

const onSubmitForm = async ({
  formRef,
  activeItemIndex,
  setActiveItemIndex,
  switcherRef,
  createProfile,
  profile,
}) => {
  try {
    if (activeItemIndex === 8 && profile?.images?.length === 0) {
      return DropDownHolder.show(
        'warn',
        '',
        'Adiciona uma imagem aí vai... Não custa nada!',
      );
    }
    if (activeItemIndex === 7) {
      return await createProfile({
        variables: {
          ...formRef?.current?.values,
          birthday: convertToDateTimePattern({
            date: formRef?.current?.values?.birthdate,
            time: formRef?.current?.values?.birthtime,
          }),
          profileStatus: 'CREATION',
        },
      });
    }
    if (activeItemIndex === switcherRef.current.childrensAmount - 1) {
      return await createProfile({
        variables: {
          ...formRef?.current?.values,
          birthday: convertToDateTimePattern({
            date: formRef?.current?.values?.birthdate,
            time: formRef?.current?.values?.birthtime,
          }),
          profileStatus: 'COMPLETED',
        },
      });
    }
    return setActiveItemIndex(activeItemIndex + 1);
  } catch (error) {
    return false;
  }
};

const CreateProfileContainer = ({ navigation }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sugestions, setSugestions] = useState(null);

  const formRef = useRef();
  const switcherRef = useRef();

  const { data, loading: queryLoading } = useQuery(GET_PROFILE_CREATION);

  const [createProfile, { loading: mutationLoading }] = useMutation(
    CREATE_PROFILE,
    {
      onError: () => DropDownHolder.show('error', '', 'Falha ao criar perfil'),
      onCompleted: () => {
        if (activeItemIndex === 7) {
          return setActiveItemIndex(activeItemIndex + 1);
        }
        if (activeItemIndex === switcherRef.current.childrensAmount - 1) {
          return navigation.replace('Tabs');
        }
        return false;
      },
      refetchQueries: [{ query: GET_PROFILE_CREATION }],
    },
  );

  const [addProfileImage, { loading: loadingAddImage }] = useMutation(
    ADD_PROFILE_IMAGE,
    {
      onError: () =>
        DropDownHolder.show('error', '', 'Falha ao adicionar image'),
      refetchQueries: [{ query: GET_PROFILE_CREATION }],
    },
  );

  const [removeProfileImage, { loading: loadingRemoveImage }] = useMutation(
    REMOVE_PROFILE_IMAGE,
    {
      onError: () =>
        DropDownHolder.show('error', '', 'Falha ao remover imagem'),
      refetchQueries: [{ query: GET_PROFILE_CREATION }],
    },
  );

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(4)
      .required('Seu nome nao pode conter menos de 4 caracteres'),
    eye: yup.string().min(3),
    birthdate: yup.string().when('_', {
      is: () => activeItemIndex > 2,
      then: yup
        .string()
        .min(10, 'Ops! Digite data de nascimento.')
        .test('TST', 'error', values => moment(values, 'DD/MM/YYYY').isValid())
        .required('Digite uma data válida'),
    }),
    birthtime: yup.string().when('_', {
      is: () => activeItemIndex > 2,
      then: yup
        .string()
        .min(5, 'Ops! Digite hora de nascimento.')
        .test('TST', 'error', values => moment(values, 'HH:mm').isValid())
        .required('Digite uma hora válida'),
    }),
    birthplace: yup.object().shape({
      placeId: yup.string(),
      description: yup.string().when('placeId', {
        is: val => val?.length > 0 || activeItemIndex > 2,
        then: yup
          .string()
          .min(3)
          .required()
          .test('RESIDENCE_VALIDATION', 'error', () => {
            const { birthplace } = formRef?.current?.values;

            if (!birthplace?.placeId && birthplace?.description?.length > 0) {
              return false;
            }
            return true;
          }),
      }),
    }),
    graduation: yup.object().shape({
      placeId: yup.string().nullable(),
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
        .nullable(),
    }),
    residence: yup.object().shape({
      placeId: yup.string().nullable(),
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
        .nullable(),
    }),
    genre: yup.string().when('_', {
      is: () => activeItemIndex > 3,
      then: yup.string().required(),
    }),
    sexualOrientations: yup
      .array()
      .of(yup.string())
      .when('_', {
        is: () => activeItemIndex > 4,
        then: yup.array().of(yup.string()).required(),
      }),
    searchLoveGenre: yup.string().when('_', {
      is: () => activeItemIndex > 5,
      then: yup.string().required(),
    }),
    searchLoveAgeRange: yup.array().required(),
    searchFriendGenre: yup.string().when('_', {
      is: () => activeItemIndex > 6,
      then: yup.string().required(),
    }),
    searchFriendAgeRange: yup.array().required(),
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <>
          {activeItemIndex > 0 && (
            <TouchableOpacity
              onPress={() =>
                formRef?.current?.isValid
                  ? setActiveItemIndex(activeItemIndex - 1)
                  : false
              }
              style={{ paddingHorizontal: 20 }}>
              <Icon name="Back" width={40} height={40} />
            </TouchableOpacity>
          )}
        </>
      ),
    });
  }, [activeItemIndex]);

  useEffect(() => {
    if (data?.user?.profileStatus === 'CREATION' && activeItemIndex <= 7) {
      normalizeFormValues({ formRef, data, setActiveItemIndex });
      setActiveItemIndex(8);
    }
  }, [data]);

  useEffect(() => {
    if (activeItemIndex > 6) {
      normalizeFormValues({ formRef, data, setActiveItemIndex });
    }
  }, [data?.user?.profileStatus]);

  return (
    <CreateProfileComponent
      formRef={formRef}
      user={data?.user}
      onPressTextsCardItem={({ cardItem }) =>
        onPressTextsCardItem({ cardItem, formRef })
      }
      profile={data?.profile || null}
      onSubmitForm={() =>
        onSubmitForm({
          formRef,
          activeItemIndex,
          setActiveItemIndex,
          switcherRef,
          createProfile,
          navigation,
          profile: data?.profile,
        })
      }
      onChangeInput={({ inputRef, text }) =>
        onChangeInput({
          fieldRef: inputRef,
          setSugestions,
          text,
          formRef,
          sugestions,
        })
      }
      isLoading={
        mutationLoading || queryLoading || loadingAddImage || loadingRemoveImage
      }
      sugestions={sugestions}
      onPressSugestion={({ item, referencedInputName }) =>
        onPressSugestion({
          setSugestions: () => false,
          sugestion: item,
          fieldRef: referencedInputName,
          formRef,
        })
      }
      onChangeSliderValues={({ sliderValues, fieldRef }) =>
        formRef?.current?.setFieldValue(fieldRef, [...sliderValues])
      }
      onPressImage={() => onPressImage({ addProfileImage })}
      onPressRemoveImage={index =>
        removeProfileImage({
          variables: {
            imageId: data?.profile?.images[index]._id,
          },
        })
      }
      formInitialValues={formInitialValues}
      onPressInputButton={field => onPressInputButton({ formRef, field })}
      formSchema={formSchema}
      activeItemIndex={activeItemIndex}
      switcherRef={switcherRef}
      onPressSwitcherButton={() => formRef.current.submitForm()}
      onPressUpload={() => false}
    />
  );
};

CreateProfileContainer.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateProfileContainer;
