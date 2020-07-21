import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../styles/colors';
import Icon from './Icon';
import CircledItem from './CircledItem';
import NavigationHelperInitial from './NavigationHelperInitial';
import NavigationHelperFinal from './NavigationHelperFinal';

const Container = styled.View`
  border-radius: 24px;
  overflow: hidden;
  height: 480px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
`;
const ImageArea = styled.View`
  position: relative;
  flex: 2;
  background-color: ${COLORS.backgroundColor};
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const AboutArea = styled.View`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
`;
const About = styled.View`
  padding: 8px 20px;
`;
const Zodiac = styled.View`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
`;
const Mandala = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: #75396f;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
  border-radius: 100px;
`;
const Name = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 50px;
  letter-spacing: 0.3px;
`;
const ItemList = styled.View`
  flex-direction: row;
  margin: 5px 0px;
  align-items: center;
`;
const ItemListText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #131415;
`;
const ButtonNext = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const ProfileBox = ({
  sign,
  image,
  name,
  residence,
  occupation,
  graduation,
  onPressNext,
  showHelperInitial,
  showHelperFinal,
  tutorialDone
}) => (
  <Container>
    <ButtonNext onPress={onPressNext} />
    {!tutorialDone && showHelperFinal && <NavigationHelperFinal />}
    {!tutorialDone && showHelperInitial && <NavigationHelperInitial />}
    <ImageArea>
      <Zodiac>
        <Icon name={sign} width={74} height={23} />
      </Zodiac>
      <Image source={{ uri: image }} resizeMode="cover" />
      <Mandala>
        <CircledItem size={60} color={COLORS.white}>
          <Icon name="Mandala" width={50} height={50} />
        </CircledItem>
      </Mandala>
    </ImageArea>
    <AboutArea>
      <About>
        <Name>{name}</Name>
        <ItemList>
          <Icon name="Location" width={14} height={18} />
          <ItemListText>
            {'   '}
            {residence}
          </ItemListText>
        </ItemList>
        <ItemList>
          <Icon name="Occupation" width={16} height={14} />
          <ItemListText>
            {'   '}
            {occupation}
          </ItemListText>
        </ItemList>
        <ItemList>
          <Icon name="Graduation" width={20} height={20} />
          <ItemListText>
            {'  '}
            {graduation}
          </ItemListText>
        </ItemList>
      </About>
    </AboutArea>
  </Container>
);

ProfileBox.defaultProps = {
  occupation: null,
  graduation: null
};

ProfileBox.propTypes = {
  sign: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  residence: PropTypes.string.isRequired,
  occupation: PropTypes.string,
  graduation: PropTypes.string,
  onPressNext: PropTypes.func.isRequired,
  showHelperInitial: PropTypes.bool.isRequired,
  showHelperFinal: PropTypes.bool.isRequired,
  tutorialDone: PropTypes.bool.isRequired
};

export default ProfileBox;
