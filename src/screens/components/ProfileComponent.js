import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import DefaultButton from '../../assets/components/DefaultButton';
import ProfileBox from '../../assets/components/ProfileBox';

const Container = styled.View`
  padding: 0px 20px;
`;

const ProfileComponent = ({ loading, profile, onPressEditButton }) => (
  <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
    {loading && <ActivityIndicator size="large" />}
    <Container>
      {profile && (
        <ProfileBox
          sign={profile?.astral?.zodiac}
          name={profile?.name}
          occupation={profile?.occupation}
          image={profile?.images[0]?.image}
          residence={profile?.residence?.description}
          graduation={`${profile?.graduation.class} @${profile?.graduation?.description}`}
        />
      )}
      <DefaultButton text="EDITAR PERFIL" action={onPressEditButton} />
    </Container>
  </View>
);

ProfileComponent.defaultProps = {
  profile: null
};

ProfileComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}),
  onPressEditButton: PropTypes.func.isRequired
};

export default ProfileComponent;
