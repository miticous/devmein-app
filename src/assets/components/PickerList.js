import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from './Icon';
import { COLORS } from '../styles/colors';

const Container = styled.View`
  margin: 12px 0px;
`;
const ContentItem = styled.TouchableOpacity`
  justify-content: center;
  height: 45px;
  padding: 0px 20px;
  border-top-color: ${({ hasError }) => (hasError ? COLORS.error : '#e0e0e0')};
  border-top-width: 1px;
`;
const ItemText = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${({ checked }) => (checked ? '#27AE60' : COLORS.black)};
`;

const normalizeData = ({ data, itemsIdKey, itemsTitleKey }) => {
  const newData = data?.map(item => ({
    id: item[itemsIdKey],
    title: item[itemsTitleKey]
  }));
  return newData;
};

const isItemChecked = ({ item, checkedItemId }) =>
  checkedItemId?.some(checked => checked === item.id);

const renderList = ({
  data,
  checkedItemId,
  onPressItem,
  referencedInputName,
  itemsIdKey,
  itemsTitleKey,
  multipleChoices,
  hasError
}) => {
  const normalizedData = normalizeData({ data, itemsIdKey, itemsTitleKey });

  return normalizedData?.map((item, index) => {
    const checked = multipleChoices
      ? isItemChecked({ item, checkedItemId })
      : checkedItemId === item?.id;

    return (
      <ContentItem
        key={item?.id}
        hasError={hasError}
        onPress={() => onPressItem({ item: data[index], referencedInputName })}
      >
        <ItemText checked={checked}>
          {checked && <Icon name="Checked" width={12} height={9} />}
          {checked && '   '}
          {item?.title}
        </ItemText>
      </ContentItem>
    );
  });
};

const PickerList = ({
  checkedItemId,
  data,
  itemsIdKey,
  itemsTitleKey,
  onPressItem,
  referencedInputName,
  multipleChoices,
  hasError
}) => (
  <>
    {data && data?.length && (
      <Container>
        {renderList({
          data,
          checkedItemId,
          referencedInputName,
          itemsIdKey,
          itemsTitleKey,
          onPressItem,
          multipleChoices,
          hasError
        })}
      </Container>
    )}
  </>
);

PickerList.defaultProps = {
  hasError: false,
  checkedItemId: null
};

PickerList.propTypes = {
  checkedItemId: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  itemsIdKey: PropTypes.string.isRequired,
  itemsTitleKey: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired,
  referencedInputName: PropTypes.string.isRequired,
  multipleChoices: PropTypes.bool.isRequired,
  hasError: PropTypes.bool
};

export default PickerList;
