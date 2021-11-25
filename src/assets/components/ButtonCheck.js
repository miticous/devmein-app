import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from './Icon';

const Container = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  justify-content: center;
  align-items: center;
`;

const ButtonCheck = ({ checked }) => (
  <Container>
    {checked && <Icon name="CheckedCleaned" width={14} height={14} />}
  </Container>
);

ButtonCheck.defaultProps = {
  checked: false,
};

ButtonCheck.propTypes = {
  checked: PropTypes.bool,
};

export default ButtonCheck;
