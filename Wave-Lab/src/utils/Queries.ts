import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      email
      sounds {  // Changed to plural
        _id
        title      // Make sure this matches your schema
        audioData  // Changed from audioUrl to match schema
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      sounds {    // Changed to plural
        _id
        title
        audioData
        instrument {
          piano
          guitar
          trumpet
        }
      }
    }
  }
`;