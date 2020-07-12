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

export const EDIT_PROFILE = gql`
  mutation(
    $name: String!
    $birthday: String!
    $birthplaceId: String!
    $eyes: String
    $graduation: String
    $graduationPlace: String
    $occupation: String
    $live: String
  ) {
    editProfile(
      name: $name
      birthday: $birthday
      birthplaceId: $birthplaceId
      eyes: $eyes
      graduation: $graduation
      graduationPlace: $graduationPlace
      occupation: $occupation
      live: $live
    ) {
      _id
      images {
        _id
        image
      }
    }
  }
`;
