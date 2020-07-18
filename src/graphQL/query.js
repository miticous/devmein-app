import gql from 'graphql-tag';

export const GET_PROFILE = gql`
  query {
    profile {
      name
      birthday
      images {
        _id
        image
      }
      loc {
        coordinates
      }
      birthplace {
        placeId
        description
      }
      astral {
        zodiac
        indexes
      }
      genre
      eyes
      occupation
      graduation {
        class
        placeId
        description
      }
      residence {
        placeId
        description
      }
      sexualOrientations
    }
  }
`;

export const GET_HOME = gql`
  query {
    profile {
      name
      birthday
      images {
        _id
        image
      }
      loc {
        coordinates
      }
      birthplace {
        placeId
        description
      }
      astral {
        zodiac
        indexes
      }
      genre
      eyes
      occupation
      graduation {
        class
        placeId
        description
      }
      residence {
        placeId
        description
      }
      sexualOrientations
    }
    matches {
      _id
      startedAt
      type
      profileMatched {
        name
        images {
          _id
          image
        }
      }
      lastMessage {
        _id
        sender_id
        receiver_id
        sentAt
        text
        viewed
      }
    }
  }
`;

export const GET_PROFILE_CREATION = gql`
  query {
    profile {
      name
      birthday
      images {
        _id
        image
      }
      birthplace {
        placeId
        description
        lat
        lng
      }
      astral {
        zodiac
        indexes
      }
      genre
      eyes
      occupation
      graduation {
        class
        placeId
        description
      }
      residence {
        placeId
        description
      }
      sexualOrientations
    }
    user {
      configs {
        love {
          range
          genre
        }
        friendShip {
          range
          genre
        }
      }
      profileStatus
    }
  }
`;

export const GET_PROFILES = gql`
  query GET_PROFILES($searchType: String!) {
    profiles(searchType: $searchType) {
      _id
      name
      birthday
      loc {
        coordinates
      }
      images {
        _id
        image
      }
      birthplace {
        placeId
        description
        lat
        lng
      }
      astral {
        zodiac
        indexes
      }
      occupation
      graduation {
        class
        placeId
        description
      }
      residence {
        placeId
        description
      }
    }
  }
`;
