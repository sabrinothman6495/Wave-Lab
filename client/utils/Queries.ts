import {gql} from '@apollo/client';

export const getUserProfile = gql `
query ProfilePages ($id: ID!) {
user (id: $id) { 
username
profilePic

}
}
`;

