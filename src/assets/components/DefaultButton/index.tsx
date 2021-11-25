import React from 'react';
import { DefaultButtomProps } from './index.type';
import { Container, Label } from './styles';

const DefaultButton: React.FC<DefaultButtomProps> = ({
  text,
  action,
  disabled,
  inverted,
}) => (
  <Container onPress={() => (disabled ? false : action())} inverted={inverted}>
    <Label inverted={inverted}>{text?.toUpperCase()}</Label>
  </Container>
);

export default DefaultButton;
