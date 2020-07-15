import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
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
import ModalLoading from '../../assets/components/ModalLoading';
import ButtonPicker from '../../assets/components/ButtonPicker';
import PickerList from '../../assets/components/PickerList';
import InfoBox from '../../assets/components/InfoBox';
import DefaultButton from '../../assets/components/DefaultButton';
import SliderPicker from '../../assets/components/SliderPicker';
import ImageGrid from '../../assets/components/ImageGrid';

const Content = styled.View`
  background-color: ${COLORS.backgroundColor};
  flex: 1;
`;
const SwitcherContainer = styled.View`
  flex: 1;
`;
const ImagePickerArea = styled.TouchableOpacity`
  flex: 1;
  background-color: ${COLORS.iceColor};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const StepActive = styled.View`
  height: 6px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: ${COLORS.success};
`;
const StepArea = styled.View`
  height: 6px;
  width: 100%;
  background-color: #e0e0e0;
  position: absolute;
  box-shadow: 0px -20px 40px rgba(0, 0, 0, 0.8);
`;
const ContainerFluid = styled.View`
  padding: 0px 20px;
`;

const SexTypes = [
  { id: 'WOMAN', description: 'Mulher' },
  { id: 'MAN', description: 'Homem' },
  { id: 'HUMAN', description: 'Outro' }
];
const SearchGenre = [
  { id: 'WOMAN', description: 'Mulher' },
  { id: 'MAN', description: 'Homem' },
  { id: 'ALL', description: 'Todos' }
];
const SexualOrientationTypes = [
  { id: 'HETERO', description: 'Hétero' },
  { id: 'GAY', description: 'Gay' },
  { id: 'LESBIAN', description: 'Lésbica' },
  { id: 'BISEXUAL', description: 'Bisexual' },
  { id: 'ASEXUAL', description: 'Asexual' },
  { id: 'DEMISEXUAL', description: 'Demisexual' },
  { id: 'PANSEXUAL', description: 'Pansexual' },
  { id: 'QUEER', description: 'Queer' },
  { id: 'QUESTIONING', description: 'Questionando' },
  { id: 'OTHER', description: 'Outro' }
];

const CreateProfileComponent = ({
  onPressSwitcherButton,
  isLoading,
  activeItemIndex,
  switcherRef,
  formSchema,
  formInitialValues,
  onSubmitForm,
  formRef,
  onChangeInput,
  sugestions,
  onPressSugestion,
  onPressInputButton,
  onChangeSliderValues,
  onPressImage,
  onPressRemoveImage,
  profile
}) => (
  <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
    <Content>
      <View style={{ height: 6, width: SCREEN_WIDTH }}>
        <StepActive
          width={`${((activeItemIndex + 1) / switcherRef?.current?.childrensAmount) * 100}%`}
        />
        <StepArea />
      </View>
      <SwitcherContainer>
        <Formik
          validationSchema={formSchema}
          innerRef={formRef}
          initialValues={formInitialValues}
          onSubmit={onSubmitForm}
          validateOnChange
        >
          {({ setFieldTouched, values, errors, ...props }) => (
            <Switcher
              {...props}
              onPressSubmit={onPressSwitcherButton}
              buttonTitle={activeItemIndex === 8 ? 'FINALIZAR' : 'PRÓXIMO PASSO'}
              activeIndex={activeItemIndex}
              ref={switcherRef}
            >
              <SwitcherItem title="Vamos começar" subtitle="Insira seus dados abaixo">
                <TextInput
                  name="name"
                  label="Meu nome é"
                  onChange={() => false}
                  onPressButton={() => false}
                  optional={false}
                />
                <TextInput
                  name="eyes"
                  label="A cor dos meus olhos é"
                  optional
                  onPressButton={() => false}
                />
                <TextInput
                  name="occupation"
                  label="Minha profissão é"
                  optional
                  onPressButton={() => false}
                />
              </SwitcherItem>
              <SwitcherItem containerFluid={false}>
                <ContainerFluid>
                  <TextInput
                    name="residence.description"
                    label="Moro em"
                    onChange={onChangeInput}
                    onPressButton={onPressInputButton}
                  />
                  <InfoBox width={16} height={19} />
                </ContainerFluid>
                <PickerList
                  data={sugestions?.['residence.description']}
                  itemsIdKey="id"
                  itemsTitleKey="label"
                  checkedItemId={values?.residence?.placeId}
                  onPressItem={onPressSugestion}
                  referencedInputName="residence.description"
                />
                <ContainerFluid>
                  <DefaultButton text="Prefiro não compartilhar" />
                </ContainerFluid>
              </SwitcherItem>
              <SwitcherItem
                title="Conta mais sobre você"
                containerFluid={false}
                subtitle="Quanto mais você compartilha, mais fácil é de alguém se interessar"
              >
                <ContainerFluid>
                  <TextInput
                    name="graduation.class"
                    label="Estudante de"
                    optional
                    onPressButton={onPressInputButton}
                  />
                  <TextInput
                    onPressButton={onPressInputButton}
                    name="graduation.description"
                    label="Estudo em"
                    onChange={onChangeInput}
                    sugestions={sugestions}
                    onPressSugestion={onPressSugestion}
                    optional
                  />
                </ContainerFluid>
                <PickerList
                  data={sugestions?.['graduation.description']}
                  itemsIdKey="id"
                  itemsTitleKey="label"
                  checkedItemId={values?.graduation?.placeId}
                  onPressItem={onPressSugestion}
                  referencedInputName="graduation.description"
                />
              </SwitcherItem>
              <SwitcherItem
                title="Mapa astral"
                subtitle="Com esses dados, seu mapa astral será calculado para que o Jiàntou funcione"
              >
                <TextInput
                  name="birthday"
                  label="Data e hora de nascimento"
                  optional={false}
                  onPressButton={onPressInputButton}
                />
                <TextInput
                  name="birthplace.description"
                  label="Cidade em que nasceu"
                  optional={false}
                  onChange={onChangeInput}
                  sugestions={sugestions}
                  onPressButton={onPressInputButton}
                  onPressSugestion={onPressSugestion}
                />
                <PickerList
                  data={sugestions?.['birthplace.description']}
                  itemsIdKey="id"
                  itemsTitleKey="label"
                  checkedItemId={values?.birthplace?.placeId}
                  onPressItem={onPressSugestion}
                  referencedInputName="birthplace.description"
                />
              </SwitcherItem>
              <SwitcherItem title="Me identifico como" subtitle="Fique à vontade">
                <PickerList
                  data={SexTypes}
                  hasError={errors.genre}
                  itemsIdKey="id"
                  itemsTitleKey="description"
                  checkedItemId={values?.genre}
                  onPressItem={onPressSugestion}
                  referencedInputName="genre"
                />
              </SwitcherItem>
              <SwitcherItem
                title="Orientação sexual"
                subtitle="Fique à vontade, escolha quantas quiser"
              >
                <PickerList
                  hasError={errors.sexualOrientations}
                  data={SexualOrientationTypes}
                  itemsIdKey="id"
                  itemsTitleKey="description"
                  checkedItemId={values?.sexualOrientations}
                  multipleChoices
                  onPressItem={onPressSugestion}
                  referencedInputName="sexualOrientation"
                />
              </SwitcherItem>
              <SwitcherItem title="Amor" subtitle="Quem você procura no campo do amor?">
                <PickerList
                  hasError={errors.searchLoveGenre}
                  data={SearchGenre}
                  itemsIdKey="id"
                  itemsTitleKey="description"
                  checkedItemId={values?.searchLoveGenre}
                  onPressItem={onPressSugestion}
                  referencedInputName="searchLoveGenre"
                />

                <SliderPicker
                  onChangeSliderValues={onChangeSliderValues}
                  label="Faixa etária"
                  fieldRef="searchLoveAgeRange"
                  startRange={values?.searchLoveAgeRange?.[0]}
                  endRange={values?.searchLoveAgeRange?.[1]}
                />
              </SwitcherItem>
              <SwitcherItem title="Amizades" subtitle="E pra bater um papo?">
                <PickerList
                  hasError={errors.searchFriendGenre}
                  data={SearchGenre}
                  itemsIdKey="id"
                  itemsTitleKey="description"
                  checkedItemId={values?.searchFriendGenre}
                  onPressItem={onPressSugestion}
                  referencedInputName="searchFriendGenre"
                />
                <SliderPicker
                  onChangeSliderValues={onChangeSliderValues}
                  label="Faixa etária"
                  fieldRef="searchFriendAgeRange"
                  startRange={values?.searchFriendAgeRange?.[0]}
                  endRange={values?.searchFriendAgeRange?.[1]}
                />
              </SwitcherItem>
              <SwitcherItem title="Arrasa na foto" subtitle="Envie fotos que te representam!">
                <ImageGrid
                  data={profile?.images?.map(image => image?.image)}
                  onPressImage={onPressImage}
                  onPressRemove={onPressRemoveImage}
                />
              </SwitcherItem>
            </Switcher>
          )}
        </Formik>
      </SwitcherContainer>
    </Content>
    {isLoading && <ModalLoading visible={isLoading} />}
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
