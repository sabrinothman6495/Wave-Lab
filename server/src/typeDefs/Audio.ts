import { gql } from "apollo-server-express";

export const audioTypeDefs = gql`
  type Audio {
    id: ID!
    name: String!
    filepath: String!
    category: String
    user: User!
  }

  input AudioInput {
    name: String!
    filepath: String!
    category: String
  }

  type Query {
    getAudios: [Audio!]
    getAudioById(id: ID!): Audio
  }

  type Mutation {
    addAudio(input: AudioInput!): Audio
    updateAudio(id: ID!, input: AudioInput!): Audio
    deleteAudio(id: ID!): String
  }
`;
