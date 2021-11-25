import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, ActivityIndicator } from 'react-native';
import { StatusBarHeight } from 'helpers/StatusBarHeight';
import { colors } from '../styles/colors';

const ModalLoading = ({ visible }) => (
  <View>
    <Modal visible={visible} transparent>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: colors.shadowBackground,
          marginTop: StatusBarHeight,
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 30,
          }}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      </View>
    </Modal>
  </View>
);

ModalLoading.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default ModalLoading;
