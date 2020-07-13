import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Container = styled.View`
  padding: 10px 0px;
`;
const Line = styled.View`
  height: 100px;
  flex-direction: row;
`;
const ImageBox = styled.TouchableOpacity`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  flex-grow: 1;
  margin: 6px;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -10px;
`;

const ImageGrid = ({ data, onPressImage, onPressRemove }) => (
  <Container>
    <Line>
      <ImageBox activeOpacity={1} onPress={() => onPressImage(0)}>
        {data[0] ? (
          <Image
            source={{
              uri: data[0]
            }}
            resizeMode="contain"
          />
        ) : (
          <Icon name="Plus" fill="#75396F" width={24} height={24} />
        )}
        {data[0] && (
          <RemoveButton onPress={() => onPressRemove(0)}>
            <Icon name="Remove" width={40} height={40} />
          </RemoveButton>
        )}
      </ImageBox>
      <ImageBox activeOpacity={1} onPress={() => onPressImage(1)}>
        {data[1] ? (
          <Image
            source={{
              uri: data[1]
            }}
            resizeMode="contain"
          />
        ) : (
          <Icon name="Plus" fill="#75396F" width={24} height={35} />
        )}
        {data[1] && (
          <RemoveButton onPress={() => onPressRemove(1)}>
            <Icon name="Remove" width={40} height={40} />
          </RemoveButton>
        )}
      </ImageBox>
      <ImageBox activeOpacity={1} onPress={() => onPressImage(2)}>
        {data[2] ? (
          <Image
            source={{
              uri: data[2]
            }}
            resizeMode="contain"
          />
        ) : (
          <Icon name="Plus" fill="#75396F" width={24} height={24} />
        )}
        {data[2] && (
          <RemoveButton onPress={() => onPressRemove(2)}>
            <Icon name="Remove" width={40} height={40} />
          </RemoveButton>
        )}
      </ImageBox>
    </Line>
    <Line>
      <ImageBox activeOpacity={1} onPress={() => onPressImage(3)}>
        {data[3] ? (
          <Image
            source={{
              uri: data[3]
            }}
            resizeMode="contain"
          />
        ) : (
          <Icon name="Plus" fill="#75396F" width={24} height={24} />
        )}
        {data[3] && (
          <RemoveButton onPress={() => onPressRemove(3)}>
            <Icon name="Remove" width={40} height={40} />
          </RemoveButton>
        )}
      </ImageBox>
      <ImageBox activeOpacity={1} onPress={() => onPressImage(4)}>
        {data[4] ? (
          <Image
            source={{
              uri: data[4]
            }}
            resizeMode="contain"
          />
        ) : (
          <Icon name="Plus" fill="#75396F" width={24} height={24} />
        )}
        {data[4] && (
          <RemoveButton onPress={() => onPressRemove(4)}>
            <Icon name="Remove" width={40} height={40} />
          </RemoveButton>
        )}
      </ImageBox>
      <ImageBox activeOpacity={1} onPress={() => onPressImage(5)}>
        {data[5] ? (
          <Image
            source={{
              uri: data[5]
            }}
            resizeMode="contain"
          />
        ) : (
          <Icon name="Plus" fill="#75396F" width={24} height={24} />
        )}
        {data[5] && (
          <RemoveButton onPress={() => onPressRemove(5)}>
            <Icon name="Remove" width={40} height={40} />
          </RemoveButton>
        )}
      </ImageBox>
    </Line>
  </Container>
);

ImageGrid.defaultProps = {
  data: []
};

ImageGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired),
  onPressImage: PropTypes.func.isRequired
};

export default ImageGrid;
