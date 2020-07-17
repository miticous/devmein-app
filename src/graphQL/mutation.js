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
    $occupation: String
    $genre: String!
    $sexualOrientations: [String]!
    $birthplace: BirthplaceInput!
    $graduation: GraduationInput
    $residence: ResidenceInput
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
    $profileStatus: String!
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
      profileStatus: $profileStatus
    )
  }
`;

export const LIKE = gql`
  mutation($userLikedId: String!) {
    likeSomeone(userLikedId: $userLikedId) {
      _id
      startedAt
      matches {
        _id
        name
        images {
          image
        }
        birthday
      }
    }
  }
`;

export const UNLIKE = gql`
  mutation($userUnlikedId: String!) {
    unlikeSomeone(userUnlikedId: $userUnlikedId)
  }
`;

export const SEND_GEOLOCATION = gql`
  mutation($latitude: String!, $longitude: String!) {
    sendGeoLocation(latitude: $latitude, longitude: $longitude)
  }
`;
