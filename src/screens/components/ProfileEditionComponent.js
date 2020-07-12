import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import reactotron from 'reactotron-react-native';
import ImageGrid from '../../assets/components/ImageGrid';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import TextInput from '../../assets/components/TextInput';

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
  onPressSugestion
}) => (
  <Container nestedScrollEnabled>
    <Content>
      <ImageGrid
        data={profile?.images?.map(image => image?.image)}
        onPressImage={onPressImage}
        onPressRemove={onPressRemove}
      />
    </Content>
    <Formik initialValues={formInitialSchema} validationSchema={formSchema} innerRef={formRef}>
      {({ setFieldTouched }) => (
        <>
          <Content>
            <TextInput name="name" label="Meu nome é" />
            <TextInput name="eyes" label="A cor dos meus olhos é" />
            <TextInput name="occupation" label="Minha profissão é" />
            <TextInput name="live" label="Moro em" />
          </Content>
          <Separator />
          <Content>
            <TextInput name="graduation" label="Estudante de" />
            <TextInput name="graduationPlace" label="Estudo em" />
          </Content>
          <Content detached>
            <TextInput name="birthday" label="Data e hora de nascimento" />
            <TextInput
              name="description"
              label="Cidade em que nasceu"
              onChange={onChangeInput}
              sugestions={sugestions}
              onPressSugestion={onPressSugestion}
            />
          </Content>
        </>
      )}
    </Formik>
    {loading && <ModalLoading visible={loading} />}
  </Container>
);

export default ProfileEditionComponent;
