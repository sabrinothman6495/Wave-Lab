import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      _id
      email
      Sound {
        _id
        title
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(String, $email: String) {
    updateUser(username: $username, email: $email) {
      _id
      email
    }
  }
`;