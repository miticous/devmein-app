import styled from 'styled-components/native';
import { colors } from 'assets/styles/colors';
import { UIModifiers } from './index.type';

export const Container = styled.TouchableOpacity<UIModifiers>`
  flex-direction: row;
  height: 56px;
  margin-top: 20px;
  background-color: ${({ inverted }) =>
    inverted ? colors.primaryColor : colors.white};
  border: 1px solid ${colors.grayLight};
  border-radius: 12px;
  justify-content: space-evenly;
  align-items: center;
`;
export const Title = styled.Text<UIModifiers>`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ inverted }) => (inverted ? colors.white : colors.black)};
`;
