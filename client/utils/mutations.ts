import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
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

export const CREATE_SOUND = gql`
  mutation CreateSound($input: SoundInput!) {
    createSound(input: $input) {
      piano
      guitar
      trumpet
      postedBy {
        username
        profilePic
      }
    }
  }
`;
