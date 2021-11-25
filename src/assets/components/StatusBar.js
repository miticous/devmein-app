import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../styles/colors';
import { StatusBarHeight } from '../../helpers/StatusBarHeight';

const Container = styled.View`
  background-color: ${({ color }) => color || COLORS.backgroundColor};
  height: ${StatusBarHeight};
`;

const StatusBar = ({ color, barStyle }) => (
  <Container color={color}>
    <RNStatusBar backgroundColor={color} barStyle={barStyle} />
  </Container>
);

StatusBar.defaultProps = {
  barStyle: 'light-content',
};

StatusBar.propTypes = {
  color: PropTypes.string.isRequired,
  barStyle: PropTypes.string,
};

export default StatusBar;
