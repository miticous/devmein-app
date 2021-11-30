import React from 'react';
import Icon from 'assets/components/Icon';
import { colors } from 'assets/styles/colors';
import DefaultButton from '../../../assets/components/DefaultButton';
import { WelcomeComponentProps } from './index.type';
import { Container, Content, Body } from './styles';

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({
  onPressSignUp,
}) => (
  <Container>
    <Content>
      <Body>
        <DefaultButton
          title="LOGIN COM GIHUB"
          inverted
          action={onPressSignUp}
          Icon={
            <Icon name="GitHub" width={32} height={32} fill={colors.white} />
          }
        />
      </Body>
    </Content>
  </Container>
);

export default WelcomeComponent;
