import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { not, isEmpty } from 'ramda';
import { Formik } from 'formik';
import { COLORS } from '../../assets/styles/colors';
import InputBox from '../../assets/components/InputBox';
import Button from '../../assets/components/Button';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  background-color: ${COLORS.backgroundColor};
  padding: 0px 20px;
`;
const ContentFooter = styled.View`
  margin: 20px 0px;
`;

const SignUpComponent = ({ formLoginInitialSchema, formLoginSchema, onPressSignUp }) => (
  <Container behavior="padding">
    <Formik
      initialValues={formLoginInitialSchema}
      validationSchema={formLoginSchema}
      onSubmit={async (values, actions) => onPressSignUp({ ...values, ...actions })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, submitForm }) => (
        <>
          <InputBox
            label="Nome"
            showLabel={not(isEmpty(values.name))}
            isValid={!errors.name && touched.name}
            hasError={errors.name && touched.name}
            errorMessage={errors.name}
            value={values.name}
            onType={handleChange('name')}
            large
            placeholder="Nome"
            onFocusOut={() => {
              setFieldTouched('name');
            }}
          />
          <InputBox
            label="E-mail"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            showLabel={not(isEmpty(values.email))}
            isValid={!errors.email && touched.email}
            hasError={errors.email && touched.email}
            errorMessage={errors.email}
            value={values.email}
            onType={handleChange('email')}
            large
            placeholder="E-mail"
            onFocusOut={() => {
              setFieldTouched('email');
            }}
          />
          <InputBox
            label="Senha"
            showLabel={not(isEmpty(values.password))}
            isValid={!errors.password && touched.password}
            hasError={errors.password && touched.password}
            errorMessage={errors.password}
            value={values.password}
            secure
            large
            placeholder="Senha"
            onType={handleChange('password')}
            onFocusOut={() => {
              setFieldTouched('password');
            }}
            onSubmitEditing={() => submitForm()}
          />
          <InputBox
            label="Senha"
            showLabel={not(isEmpty(values.passwordConfirm))}
            isValid={!errors.passwordConfirm && touched.passwordConfirm}
            hasError={errors.passwordConfirm && touched.passwordConfirm}
            errorMessage={errors.passwordConfirm}
            value={values.passwordConfirm}
            secure
            large
            placeholder="Confirmar senha"
            onType={handleChange('passwordConfirm')}
            onFocusOut={() => {
              setFieldTouched('passwordConfirm');
            }}
            onSubmitEditing={() => submitForm()}
          />
          <ContentFooter>
            <Button text="Entrar" color={COLORS.primaryColor} action={() => submitForm()} />
          </ContentFooter>
        </>
      )}
    </Formik>
  </Container>
);

SignUpComponent.propTypes = {
  formLoginInitialSchema: PropTypes.shape({}).isRequired,
  formLoginSchema: PropTypes.shape({}).isRequired,
  onPressSignUp: PropTypes.func.isRequired
};

export default SignUpComponent;
