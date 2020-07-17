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

export const GET_MAIN_DATA = gql`
  query GET_MAIN_DATA($searchType: String!) {
    profile {
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
    matches {
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
