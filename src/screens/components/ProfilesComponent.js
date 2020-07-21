/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { not, isNil, isEmpty } from 'ramda';
import { getDistance } from 'geolib';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';
import ProfileBox from '../../assets/components/ProfileBox';
// import ProfileDetailsBox from '../../assets/components/ProfileDetailsBox';
import ProfileHeader from '../../assets/components/ProfileHeader';
import AnimatedProfileBox from '../../assets/components/AnimatedProfileBox';
import ProfileDetailsBox from '../../assets/components/ProfileDetailsBox';

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
`;
const Content = styled.View`
  padding: 10px 20px;
  width: 100%;
  position: absolute;
`;

const getUsersDistance = ({ coordinates, userLocation }) => {
  if (
    not(isNil(coordinates)) &&
    not(isEmpty(coordinates)) &&
    not(isNil(userLocation)) &&
    not(isEmpty(userLocation))
  ) {
    const distance = getDistance(
      { latitude: userLocation[1], longitude: userLocation[0] },
      { latitude: coordinates[1], longitude: coordinates[0] }
    );
    const kilometersDistance = distance / 1000;

    return kilometersDistance.toFixed(0);
  }
  return 0;
};

const ProfilesComponent = ({
  isProfilesLoading,
  profiles,
  userProfile,
  onMoveBottom,
  onMoveTop,
  onPressHeaderLeft,
  activeTextsIndex,
  onPressDetailsNext,
  onPressDetailsPrev,
  onPressShowDetails,
  showProfileDetails,
  texts,
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
        <Content>
          <AnimatedProfileBox
            onMoveBottom={() => onMoveBottom(item?._id)}
            onMoveTop={() => onMoveTop(item?._id)}
          >
            {showProfileDetails && (
              <ProfileDetailsBox
                images={item?.images}
                texts={texts}
                activeIndex={activeTextsIndex}
                onPressNext={onPressDetailsNext}
                onPressPrev={onPressDetailsPrev}
              />
            )}
            {!showProfileDetails && (
              <ProfileBox
                tutorialDone={tutorialDone}
                showHelperInitial={showHelperInitial}
                showHelperFinal={showHelperFinal}
                onPressNext={onPressShowDetails}
                sign={item?.astral?.zodiac}
                name={item?.name}
                occupation={item?.occupation}
                image={item?.images[0]?.image}
                residence={`${getUsersDistance({
                  coordinates: item?.loc?.coordinates,
                  userLocation: userProfile?.loc?.coordinates
                })}km, ${item?.residence?.description}`}
                graduation={`${item?.graduation.class} @${item?.graduation?.description}`}
              />
            )}
          </AnimatedProfileBox>
        </Content>
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
  activeTextsIndex: PropTypes.number.isRequired,
  onPressDetailsNext: PropTypes.func.isRequired,
  onPressDetailsPrev: PropTypes.func.isRequired,
  onPressShowDetails: PropTypes.func.isRequired,
  showProfileDetails: PropTypes.bool.isRequired,
  texts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showHelperInitial: PropTypes.bool.isRequired,
  showHelperFinal: PropTypes.bool.isRequired,
  tutorialDone: PropTypes.bool.isRequired
};

export default ProfilesComponent;
