import React, { useState } from 'react';
import { View } from 'react-native';
import reactotron from 'reactotron-react-native';
import NativeItemSelector from '../../assets/components/NativeItemSelector';

const GenreSelectionContainer = ({ route }) => {
  const { state, setState } = route.params;
  const [activeId, setActiveId] = useState(state.user.configs.searchGenre);

  return (
    <NativeItemSelector
      items={[
        { label: 'Mulheres', id: 'FEMALE' },
        { label: 'Homens', id: 'MALE' },
        { label: 'Humanos', id: '' }
      ]}
      activeId={activeId}
      onSelectItem={id => {
        setActiveId(id);
        setState({ user: { ...state.user, configs: { ...state.user.configs, searchGenre: id } } });
      }}
    />
  );
};

export default GenreSelectionContainer;
