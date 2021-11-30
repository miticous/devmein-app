import React from 'react';

export type UIModifiers = {
  inverted?: boolean;
};

export type DefaultButtomProps = {
  title: string;
  action: () => void;
  disabled?: boolean;
  inverted?: boolean;
  Icon?: React.ReactElement;
};
