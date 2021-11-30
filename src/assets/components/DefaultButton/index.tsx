import React from 'react';
import { DefaultButtomProps } from './index.type';
import { Container, Title } from './styles';

const DefaultButton: React.FC<DefaultButtomProps> = ({
  title,
  action,
  disabled,
  inverted,
  Icon,
}) => (
  <Container onPress={() => (disabled ? false : action())} inverted={inverted}>
    <Title inverted={inverted}>{title?.toUpperCase()}</Title>
    {Icon && Icon}
  </Container>
);

export default DefaultButton;
