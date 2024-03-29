import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT } from 'assets/styles';

const Container = styled.View`
  position: absolute;
  width: 100%;
  height: ${SCREEN_HEIGHT * 0.7 + 45}px;
  justify-content: center;
`;
const ChildrenBox = styled.View`
  height: ${SCREEN_HEIGHT * 0.7}px;
  justify-content: center;
`;

const AnimatedProfileBox = ({ children, onMoveTop, onMoveBottom }) => {
  const [shown, setShown] = useState(true);
  const pan = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      if (gesture?.dy <= 2 && gesture?.dy >= 2 * -1) {
        return false;
      }
      if (gesture?.dx === 0 && gesture?.dy === 0) {
        return false;
      }
      return true;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([null, { dy: pan.y }]),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy < -150) {
        onMoveTop();
        return setShown(false);
      }
      if (gesture.dy > 150) {
        onMoveBottom();
        return setShown(false);
      }
      return Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 5,
      }).start();
    },
  });

  return (
    <Container>
      {shown && (
        <Animated.View
          style={{
            opacity: pan.y.interpolate({
              inputRange: [-100, 0, 100],
              outputRange: [0.8, 1, 0.8],
            }),
            transform: [{ translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>
          <ChildrenBox>{children}</ChildrenBox>
        </Animated.View>
      )}
    </Container>
  );
};

AnimatedProfileBox.propTypes = {
  children: PropTypes.shape({}).isRequired,
  onMoveTop: PropTypes.func.isRequired,
  onMoveBottom: PropTypes.func.isRequired,
};

export default AnimatedProfileBox;
