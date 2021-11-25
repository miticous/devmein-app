import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import moment from 'moment';
import { not, isNil, isEmpty } from 'ramda';
import { getDistance } from 'geolib';
import AnimatedProfileBox from './AnimatedProfileBox';
import ProfileDetailsBox from './ProfileDetailsBox';
import ProfileBox from './ProfileBox';
import Mandala from './Mandala';

const Content = styled.View``;

const getUsersDistance = ({ coordinates, userLocation }) => {
  if (
    not(isNil(coordinates)) &&
    not(isEmpty(coordinates)) &&
    not(isNil(userLocation)) &&
    not(isEmpty(userLocation))
  ) {
    const distance = getDistance(
      { latitude: userLocation[1], longitude: userLocation[0] },
      { latitude: coordinates[1], longitude: coordinates[0] },
    );
    const kilometersDistance = distance / 1000;

    return kilometersDistance.toFixed(0);
  }
  return 0;
};

export const onPressDetailsPrev = ({
  activeTextsIndex,
  setShowProfileDetails,
  setActiveTextsIndex,
}) =>
  activeTextsIndex === 0 ? setShowProfileDetails(false) : setActiveTextsIndex(activeTextsIndex - 1);

export const onPressDetailsNext = ({
  activeTextsIndex,
  setActiveTextsIndex,
  texts,
  setShowProfileDetails,
  setShowHelperFinal,
  setShowHelperInitial,
  tutorialDone,
}) => {
  if (!tutorialDone) {
    setShowHelperInitial(false);
    setShowHelperFinal(true);
  }
  if (activeTextsIndex + 1 === texts?.length) {
    setActiveTextsIndex(0);
    return setShowProfileDetails(false);
  }
  return setActiveTextsIndex(activeTextsIndex + 1);
};

const ProfileCard = ({
  userProfile,
  onMoveBottom,
  onMoveTop,
  setShowHelperInitial,
  setShowHelperFinal,
  showHelperInitial,
  showHelperFinal,
  tutorialDone,
  item,
}) => {
  const [activeTextsIndex, setActiveTextsIndex] = React.useState(0);
  const [showProfileDetails, setShowProfileDetails] = React.useState(false);
  const [showMandala, setShowMandala] = React.useState(false);
  const { class: graduationClass } = item?.graduation?.class ?? {};

  return (
    <Content>
      <AnimatedProfileBox
        onMoveBottom={() => onMoveBottom(item?._id)}
        onMoveTop={() => onMoveTop(item?._id)}
      >
        {showProfileDetails && (
          <ProfileDetailsBox
            images={item?.images}
            texts={item?.astral?.texts}
            activeIndex={activeTextsIndex}
            onPressNext={() =>
              onPressDetailsNext({
                activeTextsIndex,
                setActiveTextsIndex,
                texts: item?.astral?.texts,
                setShowProfileDetails,
                setShowHelperFinal,
                setShowHelperInitial,
                tutorialDone,
              })
            }
            onPressPrev={() =>
              onPressDetailsPrev({
                activeTextsIndex,
                setShowProfileDetails,
                setActiveTextsIndex,
              })
            }
          />
        )}
        {!showProfileDetails && (
          <ProfileBox
            onPressMandala={() => setShowMandala(true)}
            tutorialDone={tutorialDone}
            showHelperInitial={showHelperInitial}
            showHelperFinal={showHelperFinal}
            onPressNext={() => setShowProfileDetails(true)}
            sign={item?.astral?.zodiac}
            name={item?.name}
            occupation={item?.occupation}
            image={item?.images?.[0]?.image}
            residence={`${getUsersDistance({
              coordinates: item?.loc?.coordinates,
              userLocation: userProfile?.loc?.coordinates,
            })}km, ${item?.residence?.description}`}
            graduation={graduationClass && `${graduationClass} @${item?.graduation?.description}`}
          />
        )}
        <Mandala
          image={item?.astral?.mandala}
          visible={showMandala}
          thirtyText={item?.birthplace?.description}
          secondText={moment(Number(item?.birthday)).utc().format('DD/MM/YYYY HH:mm')}
          onPressBack={() => setShowMandala(false)}
        />
      </AnimatedProfileBox>
    </Content>
  );
};

ProfileCard.propTypes = {
  item: PropTypes.shape({}).isRequired,
  userProfile: PropTypes.shape({}).isRequired,
  setShowHelperInitial: PropTypes.func.isRequired,
  setShowHelperFinal: PropTypes.func.isRequired,
  onMoveBottom: PropTypes.func.isRequired,
  onMoveTop: PropTypes.func.isRequired,
  showHelperInitial: PropTypes.bool.isRequired,
  showHelperFinal: PropTypes.bool.isRequired,
  tutorialDone: PropTypes.bool.isRequired,
};

export default ProfileCard;
