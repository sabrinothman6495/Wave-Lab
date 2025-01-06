"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `
  scalar Date

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    sounds: [Sound!]!
  }

  type Sound {
   id: ID!
    userId: ID!
    title: String!
    audioUrl: String!
  }

  type Instrument {
    piano: Boolean!
    guitar: Boolean!
    trumpet: Boolean!
  }

  type Category {
    id: ID!
    name: String!
  }

  input UserInput {
    user: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User!]!
    getSounds: [Sound!]!
    getSound(id: ID!): Sound
    getCategories: [Category!]!
    user(email: String!): User
    getUser(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSound(userId: ID!, title: String!, audioUrl: String!, instrument: InstrumentInput!): Sound!
    deleteSound(id: ID!): Boolean!
    addCategory(name: String!): Category!
    deleteCategory(id: ID!): Boolean!

    createSound(userId: ID!, title: String!, audioUrl: String!): Sound!
  }

  input InstrumentInput {
    piano: Boolean!
    guitar: Boolean!
    trumpet: Boolean!
  }
`;
exports.default = typeDefs;
