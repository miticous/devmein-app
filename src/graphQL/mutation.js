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

export const CREATE_PROFILE = gql`
  mutation(
    $name: String!
    $birthday: String!
    $eyes: String
    $occupation: String
    $genre: String!
    $sexualOrientations: [String]!
    $birthplace: BirthplaceInput!
    $graduation: GraduationInput
    $residence: ResidenceInput
    $searchLoveAgeRange: [Int]!
    $searchFriendAgeRange: [Int]!
    $searchLoveGenre: String!
    $searchFriendGenre: String!
  ) {
    editProfile(
      name: $name
      birthday: $birthday
      eyes: $eyes
      occupation: $occupation
      genre: $genre
      sexualOrientations: $sexualOrientations
      birthplace: $birthplace
      graduation: $graduation
      residence: $residence
    ) {
      _id
      images {
        _id
        image
      }
    }
    saveUserConfigs(
      searchLoveAgeRange: $searchLoveAgeRange
      searchFriendAgeRange: $searchFriendAgeRange
      searchLoveGenre: $searchLoveGenre
      searchFriendGenre: $searchFriendGenre
    )
  }
`;
