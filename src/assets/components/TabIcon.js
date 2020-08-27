import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from './Icon';

const TabIcon = styled.View`
  background-color: ${({ focused, color }) => (focused ? color : 'transparent')};
  border-radius: 24px;
  justify-content: ${({ focused }) => (focused ? 'flex-end' : 'center')};
  padding: 0px;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
`;
const TabIconText = styled.Text`
  margin-top: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 17px;
`;

const BottomTab = ({ focused, icon, label, backgroundColor, color }) => (
  <TabIcon focused={focused} color={backgroundColor}>
    <Icon
      name={icon}
      width={focused ? 15 : 24}
      height={focused ? 15 : 24}
      fill={focused ? color : '#c4c4c4'}
    />
    {focused && <TabIconText style={{ color }}>{label}</TabIconText>}
  </TabIcon>
);

BottomTab.propTypes = {
  focused: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default BottomTab;
