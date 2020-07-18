// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components/native';
// import { FlatList, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import CircledItem from './CircledItem';
// import Icon from './Icon';

// const Container = styled.View`
//   height: 130px;
// `;
// const ContentItem = styled.View`
//   height: 100%;
// `;
// const Image = styled.Image`
//   width: 100%;
//   height: 100%;
// `;
// const IconArea = styled.View`
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   bottom: 25px;
//   left: 16px;
//   flex-direction: row;
// `;
// const FirstIcon = styled.View`
//   flex: ${({ alone }) => (alone ? 0.45 : 'none')};
// `;
// const SecondIcon = styled.View`
//   z-index: -1;
//   flex: 0.1;
//   right: 15px;
// `;
// const Separator = styled.View`
//   margin: 0px 5px;
// `;
// const Text = styled.Text`
//   font-style: normal;
//   font-weight: bold;
//   font-size: 12px;
//   line-height: 18px;
//   margin-top: 10px;
//   color: #333333;
// `;

// const Carousel = ({ data }) => (
//   <Container>
//     <FlatList
//       data={data}
//       keyExtractor={item => item?._id}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={{ paddingLeft: 20 }}
//       ItemSeparatorComponent={() => <Separator />}
//       renderItem={({ item }) => (
//         <ContentItem>

//         </ContentItem>
//       )}
//     />
//   </Container>
// );

// export default Carousel;
