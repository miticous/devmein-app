import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';

const NavigationHelperBox = styled.TouchableOpacity`
  background: rgba(117, 57, 111, 0.9);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;
const NavigationHelperContent = styled.View`
  flex-direction: row;
  height: 70%;
`;
const NavigationHelperContentSide = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
const NavigationHelperContentMiddle = styled.View`
  flex: 0.01;
  justify-content: center;
`;
const NavigationHelperMiddle = styled.View`
  border-width: 1px;
  width: 1px;
  height: 100%;
  border-color: #ffffff;
  border-style: dashed;
`;
const NavigationHelperTitle = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  margin: 30px;
  text-align: center;
`;
const NavigationHelperContentText = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  color: #ffffff;
`;
const NavigationHelperIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 20px;
`;

const NavigationHelperInitial = () => {
  const [show, setShow] = React.useState(true);

  return (
    <>
      {show && (
        <NavigationHelperBox onPress={() => setShow(false)}>
          <NavigationHelperTitle>Toque nos lados para navegar</NavigationHelperTitle>
          <NavigationHelperContent>
            <NavigationHelperContentSide>
              <NavigationHelperContentText>Anterior</NavigationHelperContentText>
            </NavigationHelperContentSide>
            <NavigationHelperContentMiddle>
              <NavigationHelperMiddle />
            </NavigationHelperContentMiddle>
            <NavigationHelperContentSide>
              <NavigationHelperContentText>Próximo</NavigationHelperContentText>
            </NavigationHelperContentSide>
            <NavigationHelperIcon>
              <Icon name="HandTouch" width={40} height={46} />
            </NavigationHelperIcon>
          </NavigationHelperContent>
        </NavigationHelperBox>
      )}
    </>
  );
};
export default NavigationHelperInitial;
