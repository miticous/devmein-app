import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import DefaultButton from '../../assets/components/DefaultButton';
import ProfileBox from '../../assets/components/ProfileBox';
import Mandala from '../../assets/components/Mandala';
import { onPressDetailsNext, onPressDetailsPrev } from '../../assets/components/ProfileCard';
import ProfileDetailsBox from '../../assets/components/ProfileDetailsBox';

const Container = styled.View`
  margin: 0px 20px;
`;

const ProfileComponent = ({ loading, profile, onPressEditButton }) => {
  const [showMandala, setShowMandala] = React.useState(false);
  const [activeTextsIndex, setActiveTextsIndex] = React.useState(0);
  const [showProfileDetails, setShowProfileDetails] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      {loading && <ActivityIndicator size="large" />}
      <Container>
        {profile && (
          <>
            {showProfileDetails && (
              <ProfileDetailsBox
                images={profile?.images}
                texts={profile?.astral?.texts}
                activeIndex={activeTextsIndex}
                onPressNext={() =>
                  onPressDetailsNext({
                    activeTextsIndex,
                    setActiveTextsIndex,
                    texts: profile?.astral?.texts,
                    setShowProfileDetails,
                    tutorialDone: true
                  })
                }
                onPressPrev={() =>
                  onPressDetailsPrev({
                    activeTextsIndex,
                    setShowProfileDetails,
                    setActiveTextsIndex
                  })
                }
              />
            )}
            {!showProfileDetails && (
              <ProfileBox
                onPressMandala={() => setShowMandala(true)}
                tutorialDone
                showHelperInitial={false}
                showHelperFinal={false}
                onPressNext={() => setShowProfileDetails(true)}
                sign={profile?.astral?.zodiac}
                name={profile?.name}
                occupation={profile?.occupation}
                image={profile?.images?.[0]?.image}
                residence={profile?.residence?.descriptionr}
                graduation={`${profile?.graduation.class} @${profile?.graduation?.description}`}
              />
            )}

            <Mandala
              image={profile?.astral?.mandala}
              visible={showMandala}
              thirtyText={profile?.birthplace?.description}
              secondText={moment(Number(profile?.birthday))
                .utc()
                .format('DD/MM/YYYY HH:mm')}
              onPressBack={() => setShowMandala(false)}
            />
          </>
        )}
        <DefaultButton text="EDITAR PERFIL" action={onPressEditButton} />
      </Container>
    </View>
  );
};

ProfileComponent.defaultProps = {
  profile: null
};

ProfileComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}),
  onPressEditButton: PropTypes.func.isRequired
};

export default ProfileComponent;
