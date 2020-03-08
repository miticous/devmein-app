import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import reactotron from 'reactotron-react-native';
import { COLORS } from '../../assets/styles/colors';
import DefaultUserImage from '../../assets/images/default_user_image.jpg';
import Button from '../../assets/components/Button';
import { SCREEN_WIDTH } from '../../assets/styles';
import { SwitcherItem, Switcher } from '../../assets/components/Switcher';
import Icon from '../../assets/components/Icon';
import TextInput from '../../assets/components/TextInput';
import ModalPicker from '../../assets/components/ModalPicker';

const Content = styled.View`
  background-color: ${COLORS.backgroundColor};
  flex: 1;
`;
const SwitcherContainer = styled.View`
  flex: 1;
`;

const CreateProfileComponent = ({
  onPressSubmit,
  onPressUpload,
  user,
  profile,
  image,
  isLoading,
  time,
  date,
  onChangeDate,
  onSelectBirthPlace,
  activeItemIndex,
  onSubmitItemButton,
  onPressBack,
  switcherRef,
  formSchema,
  formInitialSchema,
  switcherItemsMap,
  modalDataCities,
  showCitiesModal,
  onDismissCitiesModal
}) => (
  <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
    {isLoading ? (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <Content>
        <View style={{ height: 6, width: SCREEN_WIDTH }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 0.8, y: 1.0 }}
            colors={[COLORS.primaryColor, COLORS.secondaryColor, COLORS.tertiaryColor]}
            style={{
              height: 6,
              width: `${(activeItemIndex / Object.keys(switcherItemsMap).length) * 100}%`,
              position: 'absolute',
              overflow: 'hidden'
            }}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginHorizontal: 10
          }}
        >
          <TouchableOpacity activeOpacity={1} onPress={onPressBack}>
            <Icon name="ArrowBack" width={30} height={30} fill={COLORS.textSecondaryColor} />
          </TouchableOpacity>
        </View>
        <SwitcherContainer>
          <Formik
            initialValues={formInitialSchema}
            validationSchema={formSchema}
            onSubmit={values => reactotron.log(values)}
          >
            {({ setFieldTouched }) => (
              <Switcher
                activeIndex={activeItemIndex}
                onPressSubmit={() => {
                  setFieldTouched(switcherItemsMap[activeItemIndex]);
                  onSubmitItemButton();
                }}
                ref={switcherRef}
              >
                <SwitcherItem title="Meu primeiro nome é">
                  <TextInput
                    name="name"
                    placeholder="Nome"
                    textInfo="Este será seu nome no Jiantou"
                  />
                </SwitcherItem>
                <SwitcherItem title="A data e a hora do meu nascimento foi">
                  <TextInput
                    centralized
                    name="birthdate"
                    placeholder="01/01/2000 00:45"
                    textInfo="Sua idade será visível para todos"
                  />
                </SwitcherItem>
                <SwitcherItem title="Eu nasci na cidade de">
                  <TextInput
                    name="birthplaceDescription"
                    placeholder="Ex: Sāo Paulo"
                    textInfo="Outros usuários nāo poderāo visualizar esta informaçāo, ela será usada apenas para o calculo do mapa astral"
                  />
                </SwitcherItem>
              </Switcher>
            )}
          </Formik>
        </SwitcherContainer>
      </Content>
    )}
    {showCitiesModal && (
      <ModalPicker
        data={modalDataCities}
        visible={showCitiesModal}
        onPressCancel={onDismissCitiesModal}
      />
    )}
  </View>
);
CreateProfileComponent.defaultProps = {
  profile: {
    images: [
      {
        image: ''
      }
    ]
  },
  user: {
    name: ''
  }
};
CreateProfileComponent.propTypes = {
  profile: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string
      })
    )
  }),
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

export default CreateProfileComponent;
