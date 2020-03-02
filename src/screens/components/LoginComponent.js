import React from 'react';
import { Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { not, isEmpty } from 'ramda';
import { COLORS } from '../../assets/styles/colors';
import Button from '../../assets/components/Button';
import StatusBar from '../../assets/components/StatusBar';
import Icon from '../../assets/components/Icon';
import InputBox from '../../assets/components/InputBox';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
  padding: 0px 20px;
`;
const LoginTitle = styled.Text`
  color: ${COLORS.textPrimaryColor};
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 0.12px;
  line-height: 26px;
  margin: 4px 0px;
  text-align: center;
`;
const LoginSubtitle = styled.Text`
  color: ${COLORS.textPrimaryColor};
  font-size: 14px;
  letter-spacing: -0.2px;
  line-height: 18px;
  margin: 4px 0px;
  text-align: center;
`;
const RecoverPasswordText = styled.Text`
  color: ${COLORS.secondaryColor};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 18px;
  text-align: center;
`;
const RecoverPasswordArea = styled.TouchableOpacity``;
const ContentHeader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ContentBody = styled.View`
  justify-content: center;
  flex: 3;
`;
const ContentFooter = styled.View`
  flex: 0.5;
  justify-content: space-evenly;
`;

const LoginComponent = ({
  onPressLogin,
  formLoginSchema,
  formLoginInitialSchema,
  onPressRecoverButton,
  onPressSingUp,
  showPassword,
  onPressEyeIcon,
  isLoading
}) => (
  <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
    <StatusBar color={COLORS.backgroundColor} barStyle="dark-content" />
    <ContentHeader>
      <Icon name="ArrowLove" width={96} height={96} fill={COLORS.primaryColor} />
      <Text
        style={{
          fontSize: 20,
          color: COLORS.secondaryColor,
          fontWeight: 'bold',
          marginTop: 20
        }}
      >
        Jiantou
      </Text>
    </ContentHeader>
    <ContentBody>
      <LoginTitle>Login</LoginTitle>
      <LoginSubtitle>Faça login para conhecer a pessoa ideal!</LoginSubtitle>
      <Formik
        initialValues={formLoginInitialSchema}
        validationSchema={formLoginSchema}
        onSubmit={async (values, actions) => onPressLogin({ ...values, ...actions })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          submitForm,
          setFieldValue
        }) => {
          const passwordIconName = showPassword ? 'ClosedEye' : 'OpenedEye';

          return (
            <>
              <InputBox
                label="E-mail"
                showLabel={not(isEmpty(values.email))}
                isValid={!errors.email && touched.email}
                hasError={errors.email && touched.email}
                errorMessage={errors.email}
                value={values.email}
                onType={handleChange('email')}
                height={60}
                large
                placeholder="E-mail"
                onFocusOut={() => {
                  setFieldTouched('email');
                }}
                editable={not(isLoading)}
                onPressIcon={() => not(isLoading) && setFieldValue('email', '')}
                icon={values.email ? 'CloseCircled' : undefined}
                returnKeyType="next"
              />
              <InputBox
                label="Senha"
                showLabel={not(isEmpty(values.password))}
                isValid={!errors.password && touched.password}
                hasError={errors.password && touched.password}
                errorMessage={errors.password}
                value={values.password}
                secure={not(showPassword)}
                height={60}
                large
                editable={not(isLoading)}
                placeholder="Senha"
                onType={handleChange('password')}
                onFocusOut={() => {
                  setFieldTouched('password');
                }}
                onPressIcon={onPressEyeIcon}
                icon={values.password ? passwordIconName : undefined}
                returnKeyType="done"
                onSubmitEditing={() => submitForm()}
              />
              <RecoverPasswordArea
                activeOpacity={1}
                onPress={onPressRecoverButton}
                id="Login-RecoveryPassword"
              >
                <RecoverPasswordText>Esqueci minha senha</RecoverPasswordText>
              </RecoverPasswordArea>
              <ContentFooter>
                <Button
                  buttonLoading={isLoading}
                  text="Entrar"
                  color={COLORS.primaryColor}
                  action={() => submitForm()}
                  buttonStyle={{
                    width: '100%',
                    height: 46
                  }}
                />
                <Button
                  buttonLoading={isLoading}
                  text="Criar conta"
                  color={COLORS.secondaryColor}
                  action={onPressSingUp}
                  buttonStyle={{
                    width: '100%'
                  }}
                />
              </ContentFooter>
            </>
          );
        }}
      </Formik>
    </ContentBody>
  </Container>
);

LoginComponent.propTypes = {
  onPressLogin: PropTypes.func.isRequired,
  formLoginSchema: PropTypes.shape({}).isRequired,
  formLoginInitialSchema: PropTypes.shape({}).isRequired,
  onPressRecoverButton: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onPressEyeIcon: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPressSingUp: PropTypes.func.isRequired
};

export default LoginComponent;
