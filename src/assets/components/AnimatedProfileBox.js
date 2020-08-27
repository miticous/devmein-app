import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  width: 100%;
  padding: 0px 20px;
  top: 20px;
`;
const ChildrenBox = styled.View``;

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
        y: pan.y._value
      });
      pan.setValue({ y: 0 });
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
      return pan.setValue({ y: 0 });
    }
  });

  return (
    <Container>
      {shown && (
        <Animated.View
          style={{
            opacity: pan.y.interpolate({
              inputRange: [-100, 0, 100],
              outputRange: [0.8, 1, 0.8]
            }),
            transform: [{ translateY: pan.y }]
          }}
          {...panResponder.panHandlers}
        >
          <ChildrenBox>{children}</ChildrenBox>
        </Animated.View>
      )}
    </Container>
  );
};

AnimatedProfileBox.propTypes = {
  children: PropTypes.shape({}).isRequired,
  onMoveTop: PropTypes.func.isRequired,
  onMoveBottom: PropTypes.func.isRequired
};

export default AnimatedProfileBox;
