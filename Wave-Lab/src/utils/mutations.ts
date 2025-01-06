import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        firstName
        lastName
        email
        profilePic
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        firstName
        lastName
        email
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
        user
        profilePic

      }
    }
  }
`;

export const DELETE_SOUND = gql`
  mutation DeleteSound($id: ID!) {
    deleteSound(id: $id)
  }
`;

export const CREATE_SOUND_COMPILATION = gql`
  mutation CreateSoundCompilation($input: SoundCompilationInput!) {
    createSoundCompilation(input: $input) {
      id
      title
      description
      sounds {
        piano
        guitar
        trumpet
      }
      postedBy {
        user
        profilePic
      }
    }
  }
`;
