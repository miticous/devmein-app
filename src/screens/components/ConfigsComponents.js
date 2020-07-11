import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from '../../assets/styles/colors';
import Icon from '../../assets/components/Icon';
import ModalLoading from '../../assets/components/ModalLoading';

const GenreTypes = {
  FEMALE: 'Mulheres',
  MALE: 'Homens',
  '': 'Humanos'
};

const ConfigsComponent = ({ loading, user, onSlideMaxDistance, onPressChangeSearchGenre }) => {
  console.log();

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                color: COLORS.textPrimaryColor,
                fontSize: 15,
                paddingHorizontal: 10,
                marginVertical: 5
              }}
            >
              Configurações de contato
            </Text>
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 10 }}>
              <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1.2 }}>
                  <Text style={{ fontSize: 17, color: COLORS.textPrimaryColor, fontWeight: '600' }}>
                    E-mail
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 2 }}>
                  <Text style={{ color: COLORS.textSecondaryColor, fontSize: 17 }}>
                    {user.email}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 0.2, justifyContent: 'center' }}>
                  <Icon name="ChevronRight" width={16} height={16} />
                </View>
              </View>
              <View
                style={{ height: 1, backgroundColor: COLORS.textSecondaryColor, opacity: 0.2 }}
              />
              <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 17, color: COLORS.textPrimaryColor, fontWeight: '600' }}>
                    Senha
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 2 }}>
                  <Text style={{ color: COLORS.textSecondaryColor, fontSize: 17 }}>Alterar</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 0.2, justifyContent: 'center' }}>
                  <Icon name="ChevronRight" width={16} height={16} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                color: COLORS.textPrimaryColor,
                fontSize: 15,
                paddingHorizontal: 10,
                marginVertical: 5
              }}
            >
              Configurações de busca
            </Text>
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 10 }}>
              <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1.5 }}>
                    <View>
                      <Text
                        style={{ fontSize: 17, color: COLORS.textPrimaryColor, fontWeight: '600' }}
                      >
                        Distância máxima
                      </Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end', flex: 2 }}>
                    <Text style={{ color: COLORS.textSecondaryColor, fontSize: 17 }}>
                      {user.configs.maxDistance} km
                    </Text>
                  </View>
                </View>
                <View>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={2000}
                    onSlidingStart={value => onSlideMaxDistance(value.toFixed(0))}
                    onSlidingComplete={value => onSlideMaxDistance(value.toFixed(0))}
                    onValueChange={value => onSlideMaxDistance(value.toFixed(0))}
                    value={Number(user.configs.maxDistance)}
                    minimumTrackTintColor={COLORS.primaryColor}
                    maximumTrackTintColor={COLORS.textSecondaryColor}
                  />
                </View>
              </View>
              <View
                style={{ height: 1, backgroundColor: COLORS.textSecondaryColor, opacity: 0.2 }}
              />
              <TouchableOpacity
                style={{ paddingVertical: 10, flexDirection: 'row' }}
                activeOpacity={1}
                onPress={onPressChangeSearchGenre}
              >
                <View style={{ flex: 0.5 }}>
                  <Text style={{ fontSize: 17, color: COLORS.textPrimaryColor, fontWeight: '600' }}>
                    Exibir
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 2 }}>
                  <Text style={{ color: COLORS.textSecondaryColor, fontSize: 17 }}>
                    {GenreTypes[user.configs.searchGenre]}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 0.2, justifyContent: 'center' }}>
                  <Icon name="ChevronRight" width={16} height={16} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {loading && <ModalLoading visible={loading} />}
    </View>
  );
};

ConfigsComponent.defaultProps = {
  user: {
    configs: {
      maxDistance: 0,
      searchGenre: ''
    },
    email: ''
  }
};

ConfigsComponent.propTypes = {
  user: PropTypes.shape({
    configs: PropTypes.shape({
      maxDistance: PropTypes.string,
      searchGenre: PropTypes.string
    }),
    email: PropTypes.string
  })
};

export default ConfigsComponent;
