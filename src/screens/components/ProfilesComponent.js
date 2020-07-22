/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import ProfileHeader from '../../assets/components/ProfileHeader';
import ProfileCard from '../../assets/components/ProfileCard';

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
`;

const ProfilesComponent = ({
  isProfilesLoading,
  profiles,
  userProfile,
  onMoveBottom,
  onMoveTop,
  onPressHeaderLeft,
  onPressShowDetails,
  texts,
  setShowHelperInitial,
  setShowHelperFinal,
  showHelperInitial,
  showHelperFinal,
  tutorialDone
}) => (
  <Container>
    <ProfileHeader
      onPress={onPressHeaderLeft}
      imageSource={userProfile?.images?.[0].image}
      name={userProfile?.name}
      icon={userProfile?.astral?.zodiac}
    />
    <FlatList
      data={profiles}
      scrollEnabled={false}
      keyExtractor={item => item?._id}
      renderItem={({ item }) => (
        <ProfileCard
          userProfile={userProfile}
          onMoveBottom={onMoveBottom}
          onMoveTop={onMoveTop}
          onPressShowDetails={onPressShowDetails}
          texts={texts}
          setShowHelperInitial={setShowHelperInitial}
          setShowHelperFinal={setShowHelperFinal}
          showHelperInitial={showHelperInitial}
          showHelperFinal={showHelperFinal}
          tutorialDone={tutorialDone}
          item={item}
        />
      )}
    />
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
  texts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showHelperInitial: PropTypes.bool.isRequired,
  showHelperFinal: PropTypes.bool.isRequired,
  tutorialDone: PropTypes.bool.isRequired
};

export default ProfilesComponent;