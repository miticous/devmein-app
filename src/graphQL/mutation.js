import gql from 'graphql-tag';

export const ADD_PROFILE_IMAGE = gql`
  mutation($file: String!) {
    addProfileImage(file: $file)
  }
`;

export const REMOVE_PROFILE_IMAGE = gql`
  mutation($imageId: String!) {
    removeProfileImage(imageId: $imageId)
  }
`;
