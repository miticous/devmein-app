import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { COLORS } from '../styles/colors';
import Icon from './Icon';
import FullScreenImage from './FullScreenImage';
import { SCREEN_HEIGHT } from '../styles';

const Container = styled.View`
  background-color: ${COLORS.backgroundColor};
  border-radius: 24px;
  overflow: hidden;
  height: ${SCREEN_HEIGHT * 0.68}px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
`;
const ImageListBox = styled.View`
  height: 40%;
  margin-left: 20px;
  margin-top: 20px;
`;
const ImageBox = styled.TouchableOpacity`
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
  margin: 20px;
`;
const DetailsBoxHeader = styled.View`
  align-items: center;
  flex-direction: row;
`;
const DetailsBoxTitle = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 38px;
  color: #75396f;
`;
const DetailsBoxSubtitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 22px;
  color: #75396f;
`;
const DetailsBoxResume = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #131415;
  margin-top: 10px;
`;
const DetailBoxButtonNext = styled.TouchableOpacity`
  width: 50%;
  height: 50%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
const DetailBoxButtonPrev = styled.TouchableOpacity`
  width: 50%;
  height: 50%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const ProfileDetailsBox = ({ images, texts, activeIndex, onPressNext, onPressPrev }) => {
  const [fullScreen, setFullScreen] = React.useState({
    visible: false,
    initialIndex: 0
  });

  return (
    <Container>
      <ImageListBox>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ImageSeparator />}
          horizontal
          data={images}
          renderItem={({ item, index }) => (
            <ImageBox onPress={() => setFullScreen({ initialIndex: index, visible: true })}>
              <Image source={{ uri: item?.image }} />
            </ImageBox>
          )}
        />
      </ImageListBox>
      <DetailBoxButtonNext onPress={onPressNext} />
      <DetailBoxButtonPrev onPress={onPressPrev} />
      <DetailsBox>
        <DetailsBoxHeader>
          <Icon name="ArrowHearth" width={16} height={20} />
          <DetailsBoxTitle>
            {'  '}
            {texts?.[activeIndex]?.title}
          </DetailsBoxTitle>
        </DetailsBoxHeader>
        <DetailsBoxSubtitle>{texts?.[activeIndex]?.subtitle}</DetailsBoxSubtitle>
        <DetailsBoxResume>{texts?.[activeIndex]?.text}</DetailsBoxResume>
      </DetailsBox>
      {fullScreen.visible && (
        <FullScreenImage
          images={images}
          initialIndex={fullScreen.initialIndex}
          onPressExit={() => setFullScreen({ ...fullScreen, visible: false })}
        />
      )}
    </Container>
  );
};

ProfileDetailsBox.defaultProps = {};

ProfileDetailsBox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  texts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onPressNext: PropTypes.func.isRequired,
  onPressPrev: PropTypes.func.isRequired
};

export default ProfileDetailsBox;
