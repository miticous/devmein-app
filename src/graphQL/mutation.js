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
    $eyes: String
    $graduation: GraduationInput
    $birthplace: BirthplaceInput!
    $residence: ResidenceInput
    $occupation: String
  ) {
    editProfile(
      name: $name
      birthday: $birthday
      birthplace: $birthplace
      eyes: $eyes
      graduation: $graduation
      occupation: $occupation
      residence: $residence
    ) {
      _id
      images {
        _id
        image
      }
    }
  }
`;
