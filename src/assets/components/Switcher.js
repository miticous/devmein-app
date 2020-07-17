import React, { useLayoutEffect, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Animated } from 'react-native';
import { SCREEN_WIDTH } from '../styles';
import DefaultButton from './DefaultButton';

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`;
const SwitcherItemContainer = styled.View`
  width: 100%;
`;
const SwitcherItemHeader = styled.View`
  flex: 0.3;
  justify-content: center;
  padding: 0px 20px;
`;
const SwitcherItemBody = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  padding: ${({ fluid }) => (fluid ? '0px 20px' : '0px')};
`;
const TextTitle = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 58px;
`;
const TextSubtitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #828282;
`;

const Switcher = React.forwardRef((props, ref) => {
  const { children, activeIndex, onPressSubmit, buttonTitle } = props;

  const ITEM_SIZE = SCREEN_WIDTH;
  const ITEM_POSITION = (activeIndex + 1) * ITEM_SIZE * -1;
  const SCROLL_TO_POSITION = ITEM_SIZE + ITEM_POSITION;

  useImperativeHandle(ref, () => ({
    childrensAmount: React.Children.count(children)
  }));

  const [scrollToIndex] = useState(new Animated.Value(SCROLL_TO_POSITION));

  useLayoutEffect(
    () =>
      Animated.spring(scrollToIndex, {
        toValue: SCROLL_TO_POSITION
      }).start(),
    [activeIndex, scrollToIndex]
  );

  return (
    <Container ref={ref}>
      <View style={{ width: SCREEN_WIDTH, flex: 0.8 }}>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'row',
            transform: [{ translateX: scrollToIndex }]
          }}
        >
          {children}
        </Animated.View>
      </View>
      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
        <View style={{ padding: 20 }}>
          <DefaultButton text={buttonTitle} action={onPressSubmit} inverted />
        </View>
      </View>
    </Container>
  );
});

const SwitcherItem = ({ children, title, subtitle, containerFluid }) => (
  <SwitcherItemContainer>
    {title && subtitle && (
      <SwitcherItemHeader>
        <TextTitle>{title}</TextTitle>
        <TextSubtitle>{subtitle}</TextSubtitle>
      </SwitcherItemHeader>
    )}
    <SwitcherItemBody fluid={containerFluid}>{children}</SwitcherItemBody>
  </SwitcherItemContainer>
);

Switcher.propTypes = {
  children: PropTypes.shape({}).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onPressSubmit: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired
};

SwitcherItem.defaultProps = {
  containerFluid: true,
  title: null,
  subtitle: null
};

SwitcherItem.propTypes = {
  containerFluid: PropTypes.bool,
  children: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export { Switcher, SwitcherItem };
