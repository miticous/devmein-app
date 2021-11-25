import React from 'react';
import styled from 'styled-components/native';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { colors } from '../../assets/styles/colors';
import { SCREEN_WIDTH } from '../../assets/styles';
import { SwitcherItem, Switcher } from '../../assets/components/Switcher';
import TextInput from '../../assets/components/TextInput';
import ModalLoading from '../../assets/components/ModalLoading';
import PickerList from '../../assets/components/PickerList';
import InfoBox from '../../assets/components/InfoBox';
import DefaultButton from '../../assets/components/DefaultButton';
import SliderPicker from '../../assets/components/SliderPicker';
import ImageGrid from '../../assets/components/ImageGrid';
import AstralTextCard from '../../assets/components/AstralTextCard';
import { checkTextAvalability, isTextChecked } from './ProfileEditionComponent';

const Content = styled.View`
  background-color: ${colors.backgroundColor};
  flex: 1;
`;
const SwitcherContainer = styled.View``;
const BirthdayInputArea = styled.View`
  flex-direction: row;
`;
const StepActive = styled.View`
  height: 6px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: ${colors.success};
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
const InnerTitle = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  margin: 0px 20px;
  margin-top: 20px;
`;
const InnerSubtitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #828282;
  margin: 20px;
`;
const TextAlert = styled.Text`
  color: ${colors.error};
`;
const TextInfo = styled.Text`
  color: ${colors.textSecondaryColor};
  margin-top: 20px;
`;
const Separator = styled.View`
  margin: 5px;
`;

const SexTypes = [
  { id: 'WOMAN', description: 'Mulher' },
  { id: 'MAN', description: 'Homem' },
  { id: 'HUMAN', description: 'Outro' },
];
const SearchGenre = [
  { id: 'WOMAN', description: 'Mulher' },
  { id: 'MAN', description: 'Homem' },
  { id: 'ALL', description: 'Todos' },
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
  { id: 'OTHER', description: 'Outro' },
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
  profile,
  user,
  onPressTextsCardItem,
}) => {
  const switcherButtonTitle =
    activeItemIndex === switcherRef?.current?.childrensAmount - 1
      ? 'FINALIZAR'
      : 'PRÓXIMO PASSO';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.lighter }}
      behavior={`${Platform.OS === 'ios' ? 'padding' : 'height'}`}>
      <View style={{ height: 6, width: SCREEN_WIDTH }}>
        <StepActive
          width={`${
            ((activeItemIndex + 1) / switcherRef?.current?.childrensAmount) *
            100
          }%`}
        />
        <StepArea />
      </View>
      <Content>
        <SwitcherContainer>
          <Formik
            validationSchema={formSchema}
            innerRef={formRef}
            initialValues={formInitialValues}
            onSubmit={onSubmitForm}
            validateOnChange>
            {({ setFieldTouched, values, errors, ...props }) => (
              <Switcher
                {...props}
                activeIndex={activeItemIndex}
                ref={switcherRef}>
                <SwitcherItem
                  title="Vamos começar"
                  subtitle="Insira seus dados abaixo"
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                <SwitcherItem
                  containerFluid={false}
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
                  <BirthdayInputArea>
                    <TextInput
                      name="birthdate"
                      label="Data de nascimento"
                      placeholder="00/00/0000"
                      optional={false}
                      containerStyle={{ flex: 1 }}
                      onPressButton={onPressInputButton}
                    />
                    <TextInput
                      name="birthtime"
                      label="Hora"
                      placeholder="00:00"
                      containerStyle={{ flex: 1 }}
                      optional={false}
                      onPressButton={onPressInputButton}
                    />
                  </BirthdayInputArea>
                  <TextAlert>
                    Atenção! Para que todos os dados referentes ao seu mapa
                    astral apareça corretamente é necessário que a{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      hora de seu nascimento
                    </Text>{' '}
                    esteja a mais exata possível; uma vez que esteja incorreta
                    as informações sobre você serão totalmente incoerentes.
                  </TextAlert>
                  <TextInfo>
                    Você pode encontrar na sua{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      certidão de nascimento
                    </Text>{' '}
                    ou contatando seus familiares
                  </TextInfo>
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
                <SwitcherItem
                  title="Me identifico como"
                  subtitle="Fique à vontade"
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                <SwitcherItem
                  title="Amor"
                  subtitle="Quem você procura no campo do amor?"
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                <SwitcherItem
                  title="Amizades"
                  subtitle="E pra bater um papo?"
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
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
                <SwitcherItem
                  title="Arrasa na foto"
                  subtitle="Envie fotos que te representam!"
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
                  <ImageGrid
                    data={profile?.images?.map(image => image?.image)}
                    onPressImage={onPressImage}
                    onPressRemove={onPressRemoveImage}
                  />
                </SwitcherItem>
                <SwitcherItem
                  title="Por último..."
                  subtitle="Com a leitura do seu Mapa astral, nós já sabemos muuuuito sobre você. Agora só precisa escolher o que você quer compartilhar publicamente:"
                  containerFluid={false}
                  onPressSubmit={onPressSwitcherButton}
                  buttonTitle={switcherButtonTitle}>
                  <InnerTitle>O que os astros dizem</InnerTitle>
                  <InnerSubtitle>
                    Escolha os tópicos que as pessoas irão ver no seu perfil
                  </InnerSubtitle>
                  <FlatList
                    data={profile?.astral?.texts}
                    horizontal
                    ItemSeparatorComponent={() => <Separator />}
                    contentContainerStyle={{
                      paddingHorizontal: 20,
                      height: 300,
                    }}
                    renderItem={({ item }) => {
                      const isItemAvailable = checkTextAvalability({
                        plan: user?.plan,
                        textType: item?.type,
                      });
                      const isItemChecked =
                        user?.plan === 'MERCURIO'
                          ? isItemAvailable
                          : isTextChecked({
                              textType: item?.type,
                              checkedItems: values.shownTexts,
                            });

                      return (
                        <AstralTextCard
                          onPressCard={() =>
                            onPressTextsCardItem({ cardItem: item?.type })
                          }
                          title={item?.title}
                          subtitle={item?.text}
                          checked={isItemChecked}
                        />
                      );
                    }}
                  />
                </SwitcherItem>
              </Switcher>
            )}
          </Formik>
        </SwitcherContainer>
      </Content>
      {isLoading && <ModalLoading visible={isLoading} />}
    </KeyboardAvoidingView>
  );
};
CreateProfileComponent.defaultProps = {
  profile: {
    images: [
      {
        image: '',
      },
    ],
  },
};
CreateProfileComponent.propTypes = {
  profile: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
      }),
    ),
  }),
  onPressSwitcherButton: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  activeItemIndex: PropTypes.number.isRequired,
  switcherRef: PropTypes.shape({}).isRequired,
  formSchema: PropTypes.shape({}).isRequired,
  formInitialValues: PropTypes.shape({}).isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  formRef: PropTypes.shape({}).isRequired,
  onChangeInput: PropTypes.func.isRequired,
  sugestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPressSugestion: PropTypes.func.isRequired,
  onPressInputButton: PropTypes.func.isRequired,
  onChangeSliderValues: PropTypes.func.isRequired,
  onPressImage: PropTypes.func.isRequired,
  onPressRemoveImage: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  onPressTextsCardItem: PropTypes.func.isRequired,
};

export default CreateProfileComponent;
