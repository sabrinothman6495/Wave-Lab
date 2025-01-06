import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        firstName
        lastName
        email
        sounds {
          _id
          title
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        sounds {
          _id
          title
        }
      }
    }
  }
`;

export const CREATE_SOUND = gql`
  mutation CreateSound(
    $title: String!
    $audioData: String!
    $instrument: InstrumentInput!
    $duration: Float
    $waveformData: [Float]
    $frequencyData: [Float]
  ) {
    createSound(
      title: $title
      audioData: $audioData
      instrument: $instrument
      duration: $duration
      waveformData: $waveformData
      frequencyData: $frequencyData
    ) {
      _id
      title
      audioData
      instrument {
        piano
        guitar
        trumpet
      }
      duration
      waveformData
      frequencyData
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SOUND = gql`
  mutation DeleteSound($_id: ID!) {
    deleteSound(_id: $_id)
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($firstName: String, $lastName: String) {
    updateUserProfile(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      email
      sounds {
        _id
        title
      }
    }
  }
`;