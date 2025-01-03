const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    Sound: [Sound]}
    
type Sound {
  id: ID!
  name: String!
  fileUrl: String!
  category: String!
  createdAt: String!
}

type Category {
  id: ID!
  name: String!
}

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

    type Query {
    users: [User]
    user(username: String!): User
    getSounds: [Sound!]!
    getSound(id: ID!): Sound
    getCategories: [Category!]!
    me: User
  }


 type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSound(name: String!, fileUrl: String!, category: String!): Sound!
  deleteSound(id: ID!): Boolean!
  addCategory(name: String!): Category!
`;

export default typeDefs;
