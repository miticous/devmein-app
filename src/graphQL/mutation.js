import gql from 'graphql-tag';

export const ADD_PROFILE_IMAGE = gql`
  mutation ($file: String!) {
    addProfileImage(file: $file)
  }
`;

export const REMOVE_PROFILE_IMAGE = gql`
  mutation ($imageId: String!) {
    removeProfileImage(imageId: $imageId)
  }
`;

export const EDIT_PROFILE = gql`
  mutation (
    $name: String!
    $birthday: String!
    $eyes: String
    $occupation: String
    $genre: String!
    $sexualOrientations: [String]!
    $birthplace: BirthplaceInput!
    $graduation: GraduationInput
    $residence: ResidenceInput
    $shownTexts: [String]
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
      shownTexts: $shownTexts
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
  mutation (
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
    $shownTexts: [String]
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
      shownTexts: $shownTexts
    ) {
      _id
      images {
        _id
        image
      }
      astral {
        texts {
          text
          title
          subtitle
          type
        }
      }
      shownTexts
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
  mutation ($userLikedId: String!, $type: String!) {
    likeSomeone(userLikedId: $userLikedId, type: $type) {
      name
      images {
        _id
        image
      }
    }
  }
`;

export const UNLIKE = gql`
  mutation ($userUnlikedId: String!, $type: String!) {
    unlikeSomeone(userUnlikedId: $userUnlikedId, type: $type)
  }
`;

export const SEND_GEOLOCATION = gql`
  mutation ($latitude: String!, $longitude: String!) {
    sendGeoLocation(latitude: $latitude, longitude: $longitude)
  }
`;

export const SEND_MESSAGE = gql`
  mutation ($matchId: String!, $message: String!) {
    sendMessage(matchId: $matchId, message: $message) {
      participant {
        _id
      }
      messages {
        _id
        text
        senderId
        receiverId
        sentAt
        viewed
      }
    }
  }
`;
