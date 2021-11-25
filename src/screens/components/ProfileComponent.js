import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSafeArea } from 'helpers/StatusBarHeight';
import { colors } from '../../assets/styles/colors';
import DefaultButton from '../../assets/components/DefaultButton';
import ProfileBox from '../../assets/components/ProfileBox';
import Mandala from '../../assets/components/Mandala';
import {
  onPressDetailsNext,
  onPressDetailsPrev,
} from '../../assets/components/ProfileCard';
import ProfileDetailsBox from '../../assets/components/ProfileDetailsBox';
import { checkTextAvalability } from './ProfileEditionComponent';

const filterAvailableTexts = ({ plan, texts, shownTexts }) => {
  const _texts = texts.reduce((accumulator, text) => {
    if (plan === 'JUPITER') {
      const shouldAddText = shownTexts?.some(_text => _text === text?.type);

      if (shouldAddText) {
        return [...accumulator, text];
      }
      return accumulator;
    }

    if (plan === 'MERCURIO') {
      const isAvailableText = checkTextAvalability({
        plan,
        textType: text?.type,
      });

      if (isAvailableText) {
        return [...accumulator, text];
      }
      return accumulator;
    }

    return accumulator;
  }, []);

  return _texts;
};

const Container = styled.View`
  margin: 20px;
  flex: 1;
`;

const ProfileComponent = ({
  loading,
  profile,
  user,
  onPressEditButton,
  onPressLogout,
}) => {
  const [showMandala, setShowMandala] = React.useState(false);
  const [activeTextsIndex, setActiveTextsIndex] = React.useState(0);
  const [showProfileDetails, setShowProfileDetails] = React.useState(false);
  const filteredTexts = filterAvailableTexts({
    plan: user?.plan,
    texts: profile?.astral?.texts,
    shownTexts: profile?.shownTexts,
  });
  const { class: graduationClass } = profile?.graduation?.class ?? {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      {loading && <ActivityIndicator size="large" />}
      <Container>
        {profile && (
          <>
            {showProfileDetails && (
              <ProfileDetailsBox
                images={profile?.images}
                texts={filteredTexts}
                activeIndex={activeTextsIndex}
                onPressNext={() =>
                  onPressDetailsNext({
                    activeTextsIndex,
                    setActiveTextsIndex,
                    texts: filteredTexts,
                    setShowProfileDetails,
                    tutorialDone: true,
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
                tutorialDone
                showHelperInitial={false}
                showHelperFinal={false}
                onPressNext={() => setShowProfileDetails(true)}
                sign={profile?.astral?.zodiac}
                name={profile?.name}
                occupation={profile?.occupation}
                image={profile?.images?.[0]?.image}
                residence={profile?.residence?.description}
                graduation={`${graduationClass} @${profile?.graduation?.description}`}
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
        <DefaultButton text="Sair" action={onPressLogout} inverted />
      </Container>
    </View>
  );
};

ProfileComponent.defaultProps = {
  profile: null,
};

ProfileComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  onPressEditButton: PropTypes.func.isRequired,
  onPressLogout: PropTypes.func.isRequired,
};

export default ProfileComponent;
