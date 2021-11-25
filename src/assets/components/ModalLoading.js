import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, ActivityIndicator } from 'react-native';
import { COLORS } from '../styles/colors';

const ModalLoading = ({ visible }) => (
  <View>
    <Modal visible={visible} transparent>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: COLORS.shadowBackground,
          marginTop: 22,
        }}
      >
        <View style={{ backgroundColor: COLORS.white, borderRadius: 10, padding: 30 }}>
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
        </View>
      </View>
    </Modal>
  </View>
);

ModalLoading.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default ModalLoading;
