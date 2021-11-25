import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { COLORS } from '../../assets/styles/colors';
import TextInput from '../../assets/components/TextInput';
import ButtonCheck from '../../assets/components/ButtonCheck';
import DefaultButton from '../../assets/components/DefaultButton';
import ModalLoading from '../../assets/components/ModalLoading';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
  padding: 0px 20px;
`;
const Header = styled.View`
  flex: 0.5;
  margin: 40px 0px;
  height: 70px;
  justify-content: space-between;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 38px;
`;
const Subtitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #828282;
`;
const Body = styled.View`
  flex: 3;
`;
const Footer = styled.View`
  flex: 1;
`;
const RememberPasswordBox = styled.TouchableOpacity`
  margin: 20px 0px;
  flex-direction: row;
  align-items: center;
`;
const RememberPasswordText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

const LoginComponent = ({
  isLoading,
  onSubmitForm,
  onPressLogin,
  formLoginSchema,
  formLoginInitialSchema,
  onPressRememberButton,
  rememberPassword,
  formRef,
}) => (
  <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
    <Header>
      <Title>Boas-vindas</Title>
      <Subtitle>Insira seu e-mail e senha para entrar </Subtitle>
    </Header>
    <Body>
      <Formik
        innerRef={formRef}
        initialValues={formLoginInitialSchema}
        validationSchema={formLoginSchema}
        validateOnChange
        onSubmit={async (values, actions) => onSubmitForm({ ...values, ...actions })}
      >
        {({ setFieldValue }) => (
          <>
            <TextInput
              label="E-mail"
              optional={false}
              name="email"
              textType="emailAddress"
              keyboardType="email-address"
              onPressButton={(field) => setFieldValue(field, '')}
            />
            <TextInput
              label="Senha"
              optional={false}
              secure
              name="password"
              textType="password"
              onPressButton={(field) => setFieldValue(field, '')}
            />
            <RememberPasswordBox onPress={onPressRememberButton}>
              <ButtonCheck checked={rememberPassword} />
              <RememberPasswordText>{'  '}Lembrar senha</RememberPasswordText>
            </RememberPasswordBox>
          </>
        )}
      </Formik>
    </Body>
    <Footer>
      <DefaultButton text="ENTRAR" inverted action={onPressLogin} />
    </Footer>
    {isLoading && <ModalLoading visible={isLoading} />}
  </Container>
);

LoginComponent.propTypes = {
  onPressLogin: PropTypes.func.isRequired,
  formLoginSchema: PropTypes.shape({}).isRequired,
  formLoginInitialSchema: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPressRememberButton: PropTypes.func.isRequired,
  rememberPassword: PropTypes.bool.isRequired,
  formRef: PropTypes.shape({}).isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default LoginComponent;
