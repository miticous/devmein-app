import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { COLORS } from '../styles/colors';

const Container = styled.View`
  background-color: ${COLORS.backgroundColor};
  border-radius: 24px;
  overflow: hidden;
  height: 480px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
`;
const ImageListBox = styled.View`
  flex: 1;
  margin-left: 20px;
  margin-top: 20px;
`;
const ImageBox = styled.View`
  width: 100px;
  border-radius: 8px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const ImageSeparator = styled.View`
  margin: 5px;
`;
const DetailsBox = styled.View`
  flex: 2;
`;

const ProfileDetailsBox = ({ images }) => (
  <Container>
    <ImageListBox>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ImageSeparator />}
        horizontal
        data={images}
        renderItem={({ item }) => (
          <ImageBox>
            <Image source={{ uri: item?.image }} />
          </ImageBox>
        )}
      />
    </ImageListBox>
    <DetailsBox />
  </Container>
);

ProfileDetailsBox.defaultProps = {};

ProfileDetailsBox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default ProfileDetailsBox;
