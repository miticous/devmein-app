import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../styles/colors';
import { SCREEN_WIDTH } from '../styles';
import Icon from './Icon';

const Container = styled.View`
  border-radius: 24px;
  background-color: ${COLORS.white};
  border: 4px solid ${({ checked }) => (checked ? '#16cb62' : '#E0E0E0')};
  width: ${SCREEN_WIDTH * 0.8}px;
`;
const Content = styled.ScrollView`
  margin: 20px 32px;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 38px;
  color: ${({ checked }) => (checked ? '#828282' : '#E8E8E8')};
`;
const Subtitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${({ checked }) => (checked ? '#828282' : '#E8E8E8')};
`;
const CheckedBox = styled.View`
  position: absolute;
  right: 5;
  top: 5;
`;

const AstralTextCard = ({ checked, title, subtitle }) => (
  <Container checked={checked}>
    <Content>
      <Title checked={checked}>{title}</Title>
      <Subtitle checked={checked}>{subtitle}</Subtitle>
    </Content>
    {checked && (
      <CheckedBox>
        <Icon name="Save" />
      </CheckedBox>
    )}
  </Container>
);

export default AstralTextCard;
