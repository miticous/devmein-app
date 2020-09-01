import React, { useLayoutEffect, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Animated } from 'react-native';
import { SCREEN_WIDTH } from '../styles';
import DefaultButton from './DefaultButton';

const Container = styled.View``;
const SwitcherItemContainer = styled.ScrollView``;
const SwitcherItemHeader = styled.View`
  padding: 0px 20px;
`;
const SwitcherItemBody = styled.View`
  width: 100%;
  margin: 30px 0px;
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
  const SWITCHER_SIZE = ITEM_SIZE * React.Children.count(children);
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
      <View style={{ width: SCREEN_WIDTH }}>
        <Animated.View
          style={{
            width: SWITCHER_SIZE,
            flexDirection: 'row',
            transform: [{ translateX: scrollToIndex }]
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Container>
  );
});

const SwitcherItem = ({
  children,
  title,
  subtitle,
  containerFluid,
  buttonTitle,
  onPressSubmit
}) => (
  <SwitcherItemContainer width={SCREEN_WIDTH}>
    {title && subtitle && (
      <SwitcherItemHeader>
        <TextTitle>{title}</TextTitle>
        <TextSubtitle>{subtitle}</TextSubtitle>
      </SwitcherItemHeader>
    )}
    <SwitcherItemBody fluid={containerFluid}>{children}</SwitcherItemBody>
    <View style={{ padding: 20 }}>
      <DefaultButton text={buttonTitle} action={onPressSubmit} inverted />
    </View>
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
