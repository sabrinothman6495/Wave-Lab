import {gql} from '@apollo/client';


export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      email
      sound {
        _id
        soundUrl
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
        soundUrl
        soundTitle
      }
    }
  }
`;
