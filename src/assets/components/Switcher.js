import React, { useLayoutEffect, useState, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import { View, Text, Animated, Easing } from 'react-native';
import reactotron from 'reactotron-react-native';
import { useField } from 'formik';
import { SCREEN_WIDTH } from '../styles';
import { COLORS } from '../styles/colors';
import Button from './Button';
import TextInput from './TextInput';

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const TextTitle = styled.Text`
  font-size: 30px;
`;

const Switcher = React.forwardRef((props, ref) => {
  const { children, activeIndex, onPressSubmit, buttonTitle } = props;

  const ITEM_SIZE = SCREEN_WIDTH;
  const ITEM_POSITION = (activeIndex + 1) * ITEM_SIZE * -1;
  const SCROLL_TO_POSITION = ITEM_SIZE + ITEM_POSITION;

  useImperativeHandle(ref, () => ({
    childrensAmount: React.Children.count(children),
    formValues: props
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
      <View style={{ flex: 0.2, justifyContent: 'center' }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Button text={buttonTitle} action={onPressSubmit} />
        </View>
      </View>
    </Container>
  );
});

const SwitcherItem = ({ children, title }) => {
  console.log();

  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 50
      }}
    >
      <View style={{ flex: 0.3, justifyContent: 'center' }}>
        <TextTitle style={{ width: '70%' }}>{title}</TextTitle>
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {children}
      </View>
    </View>
  );
};

export { Switcher, SwitcherItem };
