import gql from 'graphql-tag';

export const GET_PROFILE = gql`
  query {
    profile {
      name
      birthday
      sign
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
    }
  }
`;
