import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { FlatList } from 'react-native';
import ImageGrid from '../../assets/components/ImageGrid';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import TextInput from '../../assets/components/TextInput';
import PickerList from '../../assets/components/PickerList';
import AstralTextCard from '../../assets/components/AstralTextCard';

export const MercurioPlanTexts = ['EMOTION', 'INSTINCT', 'INTELLECT', 'PERSONALITY'];

export const checkTextAvalability = ({ plan, textType }) => {
  if (plan === 'MERCURIO') {
    const isAvailableText = MercurioPlanTexts.some(_plan => _plan === textType);

    return isAvailableText;
  }

  if (plan === 'JUPITER') {
    return true;
  }

  return false;
};

export const isTextChecked = ({ checkedItems, textType }) => {
  const _isTextChecked = checkedItems?.some(checkedItem => checkedItem === textType);

  return _isTextChecked;
};

const Container = styled.ScrollView`
  background-color: ${COLORS.backgroundColor};
`;
const Content = styled.View`
  padding: 0px 20px;
  margin-bottom: ${({ detached }) => (detached ? '0px' : '20px')};
  padding-bottom: ${({ detached }) => (detached ? '20px' : '0px')};
  background-color: ${({ detached }) => (detached ? '#F8F1F8' : COLORS.white)};
`;
const Separator = styled.View`
  height: 2px;
  background-color: #e0e0e0;
  margin: 24px 0px;
`;

const ProfileEditionComponent = ({
  onPressImage,
  profile,
  loading,
  onPressRemove,
  formInitialSchema,
  formSchema,
  formRef,
  onChangeInput,
  sugestions,
  onPressSugestion,
  onSubmitForm,
  onPressInputButton,
  user,
  onPressTextsCardItem
}) => (
  <Container nestedScrollEnabled keyboardShouldPersistTaps="always">
    <Content>
      <ImageGrid
        data={profile?.images?.map(image => image?.image)}
        onPressImage={onPressImage}
        onPressRemove={onPressRemove}
      />
    </Content>
    <Formik
      initialValues={formInitialSchema}
      validationSchema={formSchema}
      innerRef={formRef}
      onSubmit={onSubmitForm}
      validateOnChange
    >
      {({ values }) => (
        <>
          <Content>
            <TextInput name="name" label="Meu nome é" onPressButton={onPressInputButton} />
            <TextInput
              name="eyes"
              label="A cor dos meus olhos é"
              optional
              onPressButton={onPressInputButton}
            />
            <TextInput
              name="occupation"
              label="Minha profissão é"
              optional
              onPressButton={onPressInputButton}
            />
            <TextInput
              name="residence.description"
              label="Moro em"
              onChange={onChangeInput}
              onPressButton={onPressInputButton}
            />
            <PickerList
              data={sugestions?.['residence.description']}
              itemsIdKey="id"
              itemsTitleKey="label"
              checkedItemId={values?.residence?.placeId}
              onPressItem={onPressSugestion}
              referencedInputName="residence.description"
            />
          </Content>
          <Separator />
          <Content>
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
              onPressSugestion={onPressSugestion}
            />
            <PickerList
              data={sugestions?.['graduation.description']}
              itemsIdKey="id"
              itemsTitleKey="label"
              checkedItemId={values?.graduation?.placeId}
              onPressItem={onPressSugestion}
              referencedInputName="graduation.description"
            />
          </Content>
          <Content detached>
            <TextInput
              name="birthday"
              label="Data e hora de nascimento"
              onPressButton={onPressInputButton}
            />
            <TextInput
              name="birthplace.description"
              label="Cidade em que nasceu"
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
          </Content>
          <FlatList
            data={profile?.astral?.texts}
            horizontal
            ItemSeparatorComponent={() => <Separator />}
            contentContainerStyle={{
              paddingHorizontal: 20,
              marginVertical: 20,
              height: 300
            }}
            renderItem={({ item }) => {
              const isItemAvailable = checkTextAvalability({
                plan: user?.plan,
                textType: item?.type
              });
              const isItemChecked =
                user?.plan === 'MERCURIO'
                  ? isItemAvailable
                  : isTextChecked({ textType: item?.type, checkedItems: values.shownTexts });

              return (
                <AstralTextCard
                  onPressCard={() => onPressTextsCardItem({ cardItem: item?.type })}
                  title={item?.title}
                  subtitle={item?.text}
                  checked={isItemChecked}
                />
              );
            }}
          />
        </>
      )}
    </Formik>
    {loading && <ModalLoading visible={loading} />}
  </Container>
);

ProfileEditionComponent.defaultProps = {
  sugestions: null
};

ProfileEditionComponent.propTypes = {
  onPressImage: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  onPressRemove: PropTypes.func.isRequired,
  formInitialSchema: PropTypes.shape({}).isRequired,
  formSchema: PropTypes.shape({}).isRequired,
  formRef: PropTypes.shape({}).isRequired,
  onChangeInput: PropTypes.func.isRequired,
  sugestions: PropTypes.arrayOf(PropTypes.shape({})),
  onPressSugestion: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onPressInputButton: PropTypes.func.isRequired,
  onPressTextsCardItem: PropTypes.func.isRequired
};

export default ProfileEditionComponent;
