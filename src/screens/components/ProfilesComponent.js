/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import ProfileHeader from '../../assets/components/ProfileHeader';
import ProfileCard from '../../assets/components/ProfileCard';
import { StatusBarHeight } from '../../helpers/StatusBarHeight';

const Container = styled.View`
  flex: 1;
  position: relative;
  padding-top: ${StatusBarHeight}px;
  background-color: ${COLORS.backgroundColor};
`;

const renderProfiles = ({
  profiles,
  userProfile,
  onMoveBottom,
  onMoveTop,
  onPressShowDetails,
  setShowHelperInitial,
  setShowHelperFinal,
  showHelperInitial,
  showHelperFinal,
  tutorialDone,
}) =>
  profiles?.map((item) => (
    <ProfileCard
      userProfile={userProfile}
      onMoveBottom={onMoveBottom}
      onMoveTop={onMoveTop}
      onPressShowDetails={onPressShowDetails}
      setShowHelperInitial={setShowHelperInitial}
      setShowHelperFinal={setShowHelperFinal}
      showHelperInitial={showHelperInitial}
      showHelperFinal={showHelperFinal}
      tutorialDone={tutorialDone}
      item={item}
    />
  ));

const ProfilesComponent = ({
  isProfilesLoading,
  profiles,
  userProfile,
  onMoveBottom,
  onMoveTop,
  onPressHeaderLeft,
  onPressShowDetails,
  setShowHelperInitial,
  setShowHelperFinal,
  showHelperInitial,
  showHelperFinal,
  tutorialDone,
}) => (
  <Container>
    <ProfileHeader
      onPress={onPressHeaderLeft}
      imageSource={userProfile?.images?.[0]?.image}
      name={userProfile?.name}
      icon={userProfile?.astral?.zodiac}
    />
    {renderProfiles({
      isProfilesLoading,
      profiles,
      userProfile,
      onMoveBottom,
      onMoveTop,
      onPressHeaderLeft,
      onPressShowDetails,
      setShowHelperInitial,
      setShowHelperFinal,
      showHelperInitial,
      showHelperFinal,
      tutorialDone,
    })}
    {isProfilesLoading && <ModalLoading visible={isProfilesLoading} />}
  </Container>
);

ProfilesComponent.propTypes = {
  isProfilesLoading: PropTypes.bool.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userProfile: PropTypes.shape({}).isRequired,
  onMoveBottom: PropTypes.func.isRequired,
  onMoveTop: PropTypes.func.isRequired,
  onPressHeaderLeft: PropTypes.func.isRequired,
  setShowHelperInitial: PropTypes.func.isRequired,
  setShowHelperFinal: PropTypes.func.isRequired,
  onPressShowDetails: PropTypes.func.isRequired,
  showHelperInitial: PropTypes.bool.isRequired,
  showHelperFinal: PropTypes.bool.isRequired,
  tutorialDone: PropTypes.bool.isRequired,
};

export default ProfilesComponent;
