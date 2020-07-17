// import React from 'react';
// import PropTypes from 'prop-types'
// import { View, ActivityIndicator, Text, Image, TouchableOpacity } from 'react-native';
// import { not, isNil, isEmpty } from 'ramda';

// const renderMatches = ({ matches, onPressMatch, userId }) => {
//   if (not(isNil(matches)) && not(isEmpty(matches))) {
//     return matches.map(match => {
//       const { _id, matches: matcheds, lastMessage } = match;
//       const { name, images } = matcheds.find(matched => matched._id !== userId);
//       return (
//         <TouchableOpacity key={_id} onPress={() => onPressMatch(_id)}>
//           <Text>{name}</Text>
//           <View style={{ width: 100, height: 100 }}>
//             <Image
//               style={{ width: '100%', height: '100%' }}
//               resizeMode="contain"
//               source={{ uri: images[0].image }}
//             />
//           </View>
//           {lastMessage && lastMessage.text && <Text>{lastMessage.text}</Text>}
//         </TouchableOpacity>
//       );
//     });
//   }
//   return false;
// };

// const MatchesComponent = ({ matches, isMatchesLoading, userId, onPressMatch }) => (
//   <View style={{ flex: 1 }}>
//     {isMatchesLoading ? (
//       <ActivityIndicator />
//     ) : (
//       <>{renderMatches({ matches, userId, onPressMatch })}</>
//     )}
//   </View>
// );

// export default MatchesComponent;
