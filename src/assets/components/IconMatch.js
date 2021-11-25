import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from './Icon';
import CircledItem from './CircledItem';

const Container = styled.View`
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
  left: ${({ small }) => (small ? '10px' : '1px')};
  right: ${({ iconTwo }) => (iconTwo ? '20px' : '0px')};
  z-index: 2;
`;
const ContentIconTwo = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const IconMatch = ({ image, iconOne, iconTwo, small }) => (
  <Container height={small ? 50 : 95}>
    <Content>
      <CircledItem size={small ? 40 : 85}>
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
        />
      </CircledItem>
      <ContentIconOne iconTwo={iconTwo} small={small}>
        <Icon name={iconOne} width={small ? 20 : 35} height={small ? 20 : 35} />
      </ContentIconOne>
      {iconTwo && (
        <ContentIconTwo>
          <Icon
            name="FRIENDSHIP"
            width={small ? 20 : 35}
            height={small ? 20 : 35}
          />
        </ContentIconTwo>
      )}
    </Content>
  </Container>
);

IconMatch.defaultProps = {
  iconTwo: false,
  small: false,
};

IconMatch.propTypes = {
  image: PropTypes.string.isRequired,
  iconOne: PropTypes.string.isRequired,
  iconTwo: PropTypes.string,
  small: PropTypes.bool,
};

export default IconMatch;
