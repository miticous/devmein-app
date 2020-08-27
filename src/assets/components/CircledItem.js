import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  border-radius: 100px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const CircledItem = ({ children, size, color, containerStyle, testID }) => (
  <Container
    testID={testID}
    style={{ ...containerStyle, width: size, height: size, backgroundColor: color }}
  >
    {children}
  </Container>
);

CircledItem.defaultProps = {
  containerStyle: {},
  children: <></>,
  testID: undefined,
  color: null
};

CircledItem.propTypes = {
  children: PropTypes.shape({}),
  size: PropTypes.number.isRequired,
  containerStyle: PropTypes.shape({}),
  testID: PropTypes.string,
  color: PropTypes.string
};

export default CircledItem;
