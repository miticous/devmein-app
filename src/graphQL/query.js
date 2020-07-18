import gql from 'graphql-tag';

export const GET_PROFILE = gql`
  query {
    profile {
      _id
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
        birthday
        images {
          _id
          image
        }
      }
      lastMessage {
        senderId
        receiverId
        sentAt
        text
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

export const GET_CHAT = gql`
  query GET_CHAT($matchId: String!) {
    chat(matchId: $matchId) {
      participant {
        _id
        name
        birthday
        images {
          image
        }
      }
      messages {
        _id
        text
        senderId
        receiverId
        sentAt
      }
    }
  }
`;
