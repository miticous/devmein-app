import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from './Icon';

const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
`;
const ImageBox = styled.View`
  border-radius: 8px;
  /* overflow: hidden; */
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const ButtonNext = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 3;
`;
const ButtonPrev = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
`;
const FullScreenControl = styled.View`
  position: absolute;
  z-index: 4;
  flex: 1;
  bottom: 0;
  margin: 10px;
  justify-content: center;
  flex-direction: row;
`;
const FullScreenEmpty = styled.View`
  flex: 1;
`;
const FullScreenBackButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 48px;
  border-radius: 24px;
`;
const FullScreenBackButtonText = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  color: #75396f;
`;
const FullScreenIndexes = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const FullScreenIndex = styled.View`
  background-color: #ffffff;
  width: ${({ active }) => (active ? '14px' : '8px')};
  height: 8px;
  border-radius: 4px;
  margin-right: 4px;
`;

const renderIndexes = ({ size, activeIndex }) =>
  Array(size)
    .fill(size)
    .map((_, index) => <FullScreenIndex active={activeIndex === index} key={index.toString()} />);

const FullScreenImage = ({ images, initialIndex, onPressExit }) => {
  const [activeIndex, setActiveIndex] = React.useState(initialIndex || 0);

  return (
    <>
      <Container>
        <ButtonNext
          onPress={() => activeIndex + 1 !== images?.length && setActiveIndex(activeIndex + 1)}
        />
        <ButtonPrev onPress={() => activeIndex !== 0 && setActiveIndex(activeIndex - 1)} />
        <ImageBox>
          <Image source={{ uri: images?.[activeIndex]?.image, cache: 'force-cache' }} />
        </ImageBox>
        <FullScreenControl>
          <FullScreenEmpty />
          <FullScreenIndexes>
            {renderIndexes({ size: images?.length, activeIndex })}
          </FullScreenIndexes>
          <FullScreenBackButton onPress={onPressExit}>
            <Icon name="ArrowBackNoCircle" width={6} height={14} />
            <FullScreenBackButtonText>{'  '}Voltar</FullScreenBackButtonText>
          </FullScreenBackButton>
        </FullScreenControl>
      </Container>
    </>
  );
};

FullScreenImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialIndex: PropTypes.number.isRequired,
  onPressExit: PropTypes.func.isRequired,
};

export default FullScreenImage;
