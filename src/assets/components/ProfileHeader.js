import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import CircledItem from './CircledItem';
import Icon from './Icon';

const Container = styled.TouchableOpacity`
  height: 70px;
  width: 100%;
  padding: 0px 20px;
  align-items: center;
  flex-direction: row;
`;
const ImageBox = styled.View`
  flex: 1;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const InfoBox = styled.View`
  flex: 3;
`;
const Info = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
`;
const ButtonRight = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

const ProfileHeader = ({ imageSource, name, icon, onPress }) => (
  <Container onPress={onPress}>
    <ImageBox>
      <CircledItem size={40}>
        <Image source={{ uri: imageSource }} />
      </CircledItem>
    </ImageBox>
    <InfoBox>
      <Info>{name}</Info>
      <Icon name={icon} width={74} height={23} />
    </InfoBox>
    <ButtonRight>{/* <Icon name="Config" width={40} height={40} /> */}</ButtonRight>
  </Container>
);

ProfileHeader.propTypes = {
  imageSource: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ProfileHeader;
