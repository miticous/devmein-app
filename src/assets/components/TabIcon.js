import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Icon from './Icon';

const TabIcon = styled.View`
  background-color: ${({ focused, color }) =>
    focused ? color : 'transparent'};
  border-radius: 24px;
  justify-content: ${({ focused }) => (focused ? 'flex-end' : 'center')};
  padding: 15px;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
`;

const BottomTab = ({ focused, icon, backgroundColor, color }) => (
  <TabIcon focused={focused} color={backgroundColor}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Icon
        name={icon}
        width={focused ? 24 : 24}
        height={focused ? 24 : 24}
        fill={focused ? color : '#c4c4c4'}
      />
    </View>
  </TabIcon>
);

BottomTab.propTypes = {
  focused: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default BottomTab;
