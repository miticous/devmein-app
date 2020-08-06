import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../styles/colors';
import Icon from './Icon';
import { SCREEN_HEIGHT } from '../styles';

const Content = styled.View`
  width: 100%;
  position: absolute;
  z-index: 10;
  background-color: ${COLORS.backgroundColor};
  border-radius: 24px;
  height: ${SCREEN_HEIGHT * 0.68}px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
`;
const Header = styled.View`
  flex: 1;
  flex-direction: row;
`;
const BackButton = styled.TouchableOpacity`
  justify-content: center;
  flex: 1;
  align-items: center;
`;
const TitleBox = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;
const Empty = styled.View`
  flex: 1;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 19px;
`;
const Body = styled.View`
  flex: 5;
  align-items: center;
  justify-content: center;
`;
const MandalaImage = styled.Image`
  width: 90%;
  height: 100%;
`;

const Mandala = ({ image, visible, onPressBack }) => (
  <>
    {visible && (
      <Content>
        <Header>
          <BackButton onPress={onPressBack}>
            <Icon name="Back" width={40} height={40} />
          </BackButton>
          <TitleBox>
            <Title>MAPA ASTRAL</Title>
          </TitleBox>
          <Empty />
        </Header>
        <Body>
          <MandalaImage source={{ uri: image }} resizeMode="contain" />
        </Body>
      </Content>
    )}
  </>
);

Mandala.propTypes = {
  image: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onPressBack: PropTypes.func.isRequired
};

export default Mandala;
