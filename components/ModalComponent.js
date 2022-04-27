import React from 'react';
import { View, Modal } from 'react-native';

function ModalComponent({ content, modalVisible }) {
  return (
    <View>
      <Modal animationType='slide' visible={modalVisible}>
        {content}
      </Modal>
    </View>
  );
}

export default ModalComponent;
