import React from 'react';
import PropTypes from 'prop-types';
import WelcomeComponent from '../components/WelcomeComponent';

const WelcomeContainer = ({ navigation }) => (
  <WelcomeComponent
    onPressSignUp={() => navigation.navigate('SignUp')}
    onPressLogin={() => navigation.navigate('Login')}
  />
);

WelcomeContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default WelcomeContainer;
