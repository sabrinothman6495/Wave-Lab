import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      _id
      firstName
      lastName
      email
      Sound {
        _id
        title
        audioUrl
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($lastName: String, $email: String) {
    updateUser(lastName: $lastName, email: $email) {
      _id
      firstName
      lastName
      email
    }
  }
`;
