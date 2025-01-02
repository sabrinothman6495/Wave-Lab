
import {gql} from '@apollo/client';

export const registerUser = gql `
mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        profilePic
        
      }
    }
  }
`;

export const loginUser = `
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        username
        profilePic
      }
    }
  }
`;