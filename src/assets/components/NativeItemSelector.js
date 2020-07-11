import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { not, isEmpty } from 'ramda';
import { COLORS } from '../styles/colors';
import Icon from './Icon';

const renderItems = ({ items, activeId, onSelectItem }) => {
  if (not(isEmpty(items))) {
    return items.map((item, index) => {
      const { label, id } = item;
      const shouldRenderSeparator = index !== items.length - 1;
      const isActive = id === activeId;

      return (
        <TouchableOpacity
          key={id}
          onPress={() => onSelectItem(id)}
          style={{ backgroundColor: COLORS.white, paddingHorizontal: 10 }}
        >
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row'
            }}
          >
            <View style={{ flex: 1.2 }}>
              <Text style={{ fontSize: 17, color: COLORS.textPrimaryColor, fontWeight: '600' }}>
                {label}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end', flex: 0.2, justifyContent: 'center' }}>
              <Icon
                name={isActive ? 'ChallengeOff' : ''}
                width={16}
                height={16}
                fill={COLORS.primaryColor}
              />
            </View>
          </View>
          {shouldRenderSeparator && (
            <View style={{ height: 1, backgroundColor: COLORS.textSecondaryColor, opacity: 0.2 }} />
          )}
        </TouchableOpacity>
      );
    });
  }
  return false;
};

const NativeItemSelector = ({ items, activeId, onSelectItem }) => (
  <View style={{ marginVertical: 10 }}>
    <Text
      style={{
        color: COLORS.textPrimaryColor,
        fontSize: 15,
        paddingHorizontal: 10,
        marginVertical: 5
      }}
    >
      Exibir perfis de
    </Text>
    {renderItems({ items, activeId, onSelectItem })}
  </View>
);

export default NativeItemSelector;
