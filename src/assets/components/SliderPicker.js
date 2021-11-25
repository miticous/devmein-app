import React from 'react';
import styled from 'styled-components/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../styles/colors';

const Container = styled.View``;
const LabelArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Label = styled.Text`
  line-height: 35px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;
const TextArea = styled.View`
  flex: 1;
  align-items: flex-end;
`;
const Text = styled.Text`
  font-weight: bold;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  line-height: 14px;
  color: ${COLORS.grayDark};
`;
const SliderPicker = ({ onChangeSliderValues, fieldRef, label, startRange, endRange }) => (
  <Container>
    <LabelArea>
      <Label>{label}</Label>
      <TextArea>
        <Text>
          {startRange} - {endRange}
        </Text>
      </TextArea>
    </LabelArea>
    <MultiSlider
      isMarkersSeparated
      enabledTwo
      values={[startRange, endRange]}
      min={18}
      max={100}
      markerOffsetY={6}
      onValuesChangeFinish={(sliderValues) => onChangeSliderValues({ sliderValues, fieldRef })}
      containerStyle={{ alignItems: 'center' }}
      sliderLength={Dimensions.get('window').width - 40}
      selectedStyle={{ backgroundColor: COLORS.primaryColor }}
      trackStyle={{
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.grayLight,
      }}
    />
  </Container>
);

SliderPicker.defaultProps = {
  startRange: 18,
  endRange: 26,
};

SliderPicker.propTypes = {
  onChangeSliderValues: PropTypes.func.isRequired,
  fieldRef: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  startRange: PropTypes.number,
  endRange: PropTypes.number,
};

export default SliderPicker;
