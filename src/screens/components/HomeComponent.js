/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import ProfileHeader from '../../assets/components/ProfileHeader';
import Carousel from '../../assets/components/Carousel';

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
`;
const Content = styled.View`
  border-top-color: #e0e0e0;
  border-top-width: 1px;
  border-bottom-color: #e0e0e0;
  border-bottom-width: 1px;
  padding-bottom: 20px;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  margin: 15px 20px;
`;

const normalizeCarouselData = ({ matches }) =>
  matches?.map(match => ({
    _id: match?._id,
    image: match?.profileMatched?.images?.[0].image,
    name: match?.profileMatched?.name,
    type: match?.type,
    birthday: match?.profileMatched?.birthday
  }));

const HomeComponent = ({
  isProfilesLoading,
  userProfile,
  onPressHeaderLeft,
  matches,
  onPressCarouselItem
}) => (
  <Container>
    <ProfileHeader
      onPress={onPressHeaderLeft}
      imageSource={userProfile?.images?.[0].image}
      name={userProfile?.name}
      icon={userProfile?.astral?.zodiac}
    />
    <Content>
      <Title>Novas flechadas e amizades</Title>
      <Carousel data={normalizeCarouselData({ matches })} onPressItem={onPressCarouselItem} />
    </Content>
    {isProfilesLoading && <ModalLoading visible={isProfilesLoading} />}
  </Container>
);

HomeComponent.propTypes = {
  isProfilesLoading: PropTypes.bool.isRequired,
  userProfile: PropTypes.shape({}).isRequired,
  onPressHeaderLeft: PropTypes.func.isRequired,
  matches: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default HomeComponent;
