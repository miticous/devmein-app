import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';
import CircledItem from './CircledItem';

const Container = styled.View`
  height: 95px;
  position: absolute;
`;
const Content = styled.View`
  height: 100%;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const ContentIconOne = styled.View`
  position: absolute;
  bottom: 0;
  right: ${({ iconTwo }) => (iconTwo ? '20px' : '0px')};
  z-index: 2;
`;
const ContentIconTwo = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const IconMatch = ({ image, iconOne, iconTwo }) => (
  <Container>
    <Content>
      <CircledItem size={85}>
        <Image
          source={{
            uri: image
          }}
          resizeMode="cover"
        />
      </CircledItem>
      <ContentIconOne iconTwo={iconTwo}>
        <Icon name={iconOne} width={35} height={35} />
      </ContentIconOne>
      {iconTwo && (
        <ContentIconTwo>
          <Icon name="FRIENDSHIP" width={35} height={35} />
        </ContentIconTwo>
      )}
    </Content>
  </Container>
);

export default IconMatch;
