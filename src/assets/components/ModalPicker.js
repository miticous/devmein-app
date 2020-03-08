import React from 'react';
import styled from 'styled-components/native';
import { View, Modal, Text, ScrollView, TouchableOpacity } from 'react-native';
import { not, isEmpty, isNil } from 'ramda';
import reactotron from 'reactotron-react-native';
import { COLORS } from '../styles/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles';

const Container = styled.View`
  margin-top: 20px;
  justify-content: center;
  height: ${SCREEN_HEIGHT};
  background-color: rgba(0, 0, 0, 0.8);
`;
const Separator = styled.View`
  height: 1px;
  opacity: 0.2;
  background-color: ${COLORS.textSecondaryColor};
  margin: 20px 0px;
`;
const MainSeparator = styled.View`
  height: 1px;
  opacity: 0.2;
  background-color: ${COLORS.textSecondaryColor};
  margin-top: 20px;
`;

const renderItems = ({ data, onSelectItem }) => {
  if (not(isNil(data)) && not(isEmpty(data))) {
    return data.map(item => {
      const { id, label } = item;

      return (
        <TouchableOpacity key={id.toString()} onPress={onSelectItem}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: COLORS.changes,
              fontWeight: '600'
            }}
          >
            {label}
          </Text>
          <Separator />
        </TouchableOpacity>
      );
    });
  }
  return false;
};

const ModalPicker = ({ data, onSelectItem, visible, onPressCancel }) => (
  <View style={{ marginTop: 22 }}>
    <Modal visible={visible} transparent>
      <Container>
        <View
          style={{
            marginHorizontal: 20,
            height: SCREEN_HEIGHT * 0.65,
            borderRadius: 10,
            backgroundColor: COLORS.shadowBackground,
            paddingHorizontal: 20,
            paddingTop: 20
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 22, color: COLORS.textSecondaryColor }}>
            Cidades encontradas
          </Text>
          <MainSeparator />
          <ScrollView style={{ paddingTop: 20 }}>{renderItems({ data, onSelectItem })}</ScrollView>
        </View>
        <TouchableOpacity
          onPress={onPressCancel}
          activeOpacity={1}
          style={{
            flex: 0.3,
            borderRadius: 10,
            backgroundColor: COLORS.shadowBackground,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 18 }}>cancelar</Text>
        </TouchableOpacity>
      </Container>
    </Modal>
  </View>
);

export default ModalPicker;
