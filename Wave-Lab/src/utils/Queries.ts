import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
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
        instrument {
          _id
          piano
          guitar
          trumpet
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      _id
      firstName
      lastName
      email
      sound {
        _id
        soundTitle
        audioUrl
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($firstName: String, $lastName: String, $email: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
      _id
      firstName
      lastName
      email
    }
  }
`;
