import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';

const NavigationHelperTop = styled.View`
  align-items: center;
  background: rgba(243, 95, 95, 0.8);
  width: 100%;
  height: 50%;
  position: absolute;
  top: 0;
  z-index: 1;
`;
const NavigationHelperBottom = styled.View`
  justify-content: flex-end;
  align-items: center;
  background: rgba(165, 165, 165, 0.7);
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

const NavigationHelperFinal = () => (
  <>
    <NavigationHelperTop>
      <Icon name="LoveThat" width={40} height={51} />
      <Icon name="BigHearth" width={97} height={98} />
    </NavigationHelperTop>
    <NavigationHelperBottom>
      <Icon name="BigX" width={90} height={90} />
      <Icon name="LoventThat" width={47} height={51} />
    </NavigationHelperBottom>
  </>
);
export default NavigationHelperFinal;
