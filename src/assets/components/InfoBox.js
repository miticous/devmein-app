import React from 'react';
import styled from 'styled-components/native';
import Icon from './Icon';

const Container = styled.View`
  height: 50px;
  background-color: #f8f1f8;
  border-radius: 8px;
  margin: 5px 0px;
`;
const Content = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 10px;
`;
const IconArea = styled.View`
  flex: 0.5;
`;
const TextArea = styled.View`
  flex: 5;
`;
const Text = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #75396f;
`;

const InfoBox = () => (
  <Container>
    <Content>
      <IconArea>
        <Icon name="Location" width={16} height={19} />
      </IconArea>
      <TextArea>
        <Text>Localização ativada</Text>
      </TextArea>
      <IconArea>
        <Icon name="Checked" width={12} height={9} />
      </IconArea>
    </Content>
  </Container>
);

export default InfoBox;
