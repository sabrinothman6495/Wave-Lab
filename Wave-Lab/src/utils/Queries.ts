import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      email
      sounds {  
        _id
        title      
        audioData  
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
      sounds {    
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