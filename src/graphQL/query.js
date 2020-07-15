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
