import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import ImageGrid from '../../assets/components/ImageGrid';
import { COLORS } from '../../assets/styles/colors';
import ModalLoading from '../../assets/components/ModalLoading';

const ProfileEditionComponent = ({ onPressImage, profile, loading, onPressRemove }) => (
  <View style={{ backgroundColor: COLORS.backgroundColor, paddingHorizontal: 20 }}>
    <ImageGrid
      data={profile?.images?.map(image => image?.image)}
      onPressImage={onPressImage}
      onPressRemove={onPressRemove}
    />
    {loading && <ModalLoading visible={loading} />}
  </View>
);

export default ProfileEditionComponent;
