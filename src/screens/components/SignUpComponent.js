import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { colors } from '../../assets/styles/colors';
import TextInput from '../../assets/components/TextInput';
import DefaultButton from '../../assets/components/DefaultButton';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  background-color: ${colors.backgroundColor};
  padding: 0px 20px;
`;
const Header = styled.View`
  flex: 0.5;
  justify-content: center;
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

const SignUpComponent = ({
  formLoginInitialSchema,
  formLoginSchema,
  onPressSignUp,
  formRef,
  onPressCreate,
}) => (
  <Container>
    <Header>
      <Subtitle>Cadastre-se para começar usar o Jiantou</Subtitle>
    </Header>
    <Body>
      <Formik
        innerRef={formRef}
        initialValues={formLoginInitialSchema}
        validationSchema={formLoginSchema}
        onSubmit={async (values, actions) =>
          onPressSignUp({ ...values, ...actions })
        }>
        {() => (
          <>
            <TextInput
              label="E-mail"
              optional={false}
              name="email"
              textType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput
              label="Senha"
              optional={false}
              secure
              name="password"
              textType="password"
            />
            <TextInput
              label="Senha"
              optional={false}
              secure
              name="passwordConfirm"
              textType="password"
            />
          </>
        )}
      </Formik>
    </Body>
    <Footer>
      <Footer>
        <DefaultButton text="CRIAR CONTA" inverted action={onPressCreate} />
      </Footer>
    </Footer>
  </Container>
);

SignUpComponent.propTypes = {
  formLoginInitialSchema: PropTypes.shape({}).isRequired,
  formLoginSchema: PropTypes.shape({}).isRequired,
  onPressSignUp: PropTypes.func.isRequired,
  formRef: PropTypes.shape({}).isRequired,
  onPressCreate: PropTypes.func.isRequired,
};

export default SignUpComponent;
