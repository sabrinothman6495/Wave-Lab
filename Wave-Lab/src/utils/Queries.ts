import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      sound {
        _id
        audioUrl
        soundTitle
      }
    }
  }
`;