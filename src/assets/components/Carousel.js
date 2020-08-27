import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CircledItem from './CircledItem';
import Icon from './Icon';

const Container = styled.View`
  height: 130px;
`;
const ContentItem = styled.TouchableOpacity`
  height: 100%;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const IconArea = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 25px;
  left: 16px;
  flex-direction: row;
`;
const FirstIcon = styled.View`
  flex: ${({ alone }) => (alone ? 0.45 : 'none')};
`;
const SecondIcon = styled.View`
  z-index: -1;
  flex: 0.1;
  right: 15px;
`;
const Separator = styled.View`
  margin: 0px 5px;
`;
const Text = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
  color: #333333;
`;

const Carousel = ({ data, onPressItem }) => (
  <Container>
    <FlatList
      data={data}
      keyExtractor={item => item?._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 20 }}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => (
        <ContentItem onPress={() => onPressItem(item)}>
          <CircledItem size={90}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.5 }}
              locations={[0, 0.5, 0.6]}
              colors={['#e30754', '#c2156e', '#e30716']}
              style={{
                borderRadius: 70,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircledItem size={83} color="white">
                <CircledItem size={70}>
                  <Image
                    source={{
                      uri: item?.image
                    }}
                    resizeMode="cover"
                  />
                </CircledItem>
              </CircledItem>
            </LinearGradient>
          </CircledItem>
          <IconArea alone={item?.type !== 'BOTH'}>
            <FirstIcon alone={item?.type !== 'BOTH'}>
              <Icon name={item?.type !== 'BOTH' ? item?.type : 'LOVE'} width={35} height={35} />
            </FirstIcon>
            {item?.type === 'BOTH' && (
              <SecondIcon>
                <Icon name="FRIENDSHIP" width={35} height={35} />
              </SecondIcon>
            )}
          </IconArea>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text>{item?.name}</Text>
          </View>
        </ContentItem>
      )}
    />
  </Container>
);

Carousel.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default Carousel;
