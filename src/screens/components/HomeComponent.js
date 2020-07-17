/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import ProfileHeader from '../../assets/components/ProfileHeader';

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
`;

const HomeComponent = ({ isProfilesLoading, userProfile, onPressHeaderLeft }) => (
  <Container>
    <ProfileHeader
      onPress={onPressHeaderLeft}
      imageSource={userProfile?.images?.[0].image}
      name={userProfile?.name}
      icon={userProfile?.astral?.zodiac}
    />
    {isProfilesLoading && <ModalLoading visible={isProfilesLoading} />}
  </Container>
);

HomeComponent.propTypes = {
  isProfilesLoading: PropTypes.bool.isRequired,
  userProfile: PropTypes.shape({}).isRequired,
  onPressHeaderLeft: PropTypes.func.isRequired
};

export default HomeComponent;
