import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/styles/colors';
import Icon from '../../assets/components/Icon';
import CircledItem from '../../assets/components/CircledItem';
import DefaultButton from '../../assets/components/DefaultButton';

const Container = styled.View`
  padding: 0px 20px;
`;
const ProfileBox = styled.View`
  border-radius: 24px;
  overflow: hidden;
  height: 480px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
`;
const ProfileImageArea = styled.View`
  position: relative;
  flex: 2;
`;
const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const ProfileAboutArea = styled.View`
  flex: 1;
  background-color: ${COLORS.backgroundColor};
`;
const ProfileAbout = styled.View`
  padding: 8px 20px;
`;
const ProfileZodiac = styled.View`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
`;
const ProfileMandala = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: #75396f;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
  border-radius: 100;
`;
const ProfileName = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 50px;
  letter-spacing: 0.3px;
`;
const ProfileItemList = styled.View`
  flex-direction: row;
  margin: 5px 0px;
  align-items: center;
`;
const ProfileItemListText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #131415;
`;

const ProfileComponent = ({ loading, profile, data }) => {
  console.log();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
      {loading && <ActivityIndicator size="large" />}
      <Container>
        {profile && (
          <ProfileBox>
            <ProfileImageArea>
              <ProfileZodiac>
                <Icon name="BullZodiac" width={74} height={23} />
              </ProfileZodiac>
              <ProfileImage source={{ uri: profile?.images[0]?.image }} />
              <ProfileMandala>
                <CircledItem size={60} color={COLORS.white}>
                  <Icon name="Mandala" width={50} height={50} />
                </CircledItem>
              </ProfileMandala>
            </ProfileImageArea>
            <ProfileAboutArea>
              <ProfileAbout>
                <ProfileName>{profile?.name}</ProfileName>
                <ProfileItemList>
                  <Icon name="Location" width={14} height={18} />
                  <ProfileItemListText> {profile?.birthplace?.description}</ProfileItemListText>
                </ProfileItemList>
                <ProfileItemList>
                  <Icon name="Occupation" width={16} height={14} />
                  <ProfileItemListText> Desenvolvedor de Sofware</ProfileItemListText>
                </ProfileItemList>
                <ProfileItemList>
                  <Icon name="Graduation" width={16} height={14} />
                  <ProfileItemListText> ADS @UNI-ANHANGUERA</ProfileItemListText>
                </ProfileItemList>
              </ProfileAbout>
            </ProfileAboutArea>
          </ProfileBox>
        )}

        <DefaultButton text="EDITAR PERFIL" />
      </Container>
    </View>
  );
};

export default ProfileComponent;
