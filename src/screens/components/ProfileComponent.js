import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import Icon from '../../assets/components/Icon';
import CircledItem from '../../assets/components/CircledItem';
import DefaultButton from '../../assets/components/DefaultButton';
import ProfileBox from '../../assets/components/ProfileBox';

const Container = styled.View`
  padding: 0px 20px;
`;

const ProfileComponent = ({ loading, profile, data, onPressEditButton }) => {
  console.log();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      {loading && <ActivityIndicator size="large" />}
      <Container>
        {profile && (
          <ProfileBox
            sign={profile?.sign}
            name={profile?.name}
            occupation="Desenvolvedor de Sofware"
            image={profile?.images[0]?.image}
            birthplace={profile?.birthplace?.description}
            graduation="ADS @UNIANHANGUERA"
          />
        )}

        <DefaultButton text="EDITAR PERFIL" action={onPressEditButton} />
      </Container>
    </View>
  );
};

export default ProfileComponent;
