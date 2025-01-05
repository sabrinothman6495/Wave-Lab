import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      _id
      username
      email
      Sound {
        _id
        title
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;