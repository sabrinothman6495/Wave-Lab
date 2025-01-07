const typeDefs = `

  type User {
    _id: ID!
    username: String!
    email: String!
    sounds: [Sound!]!
  }

  type Sound {
    id: ID!
    name: String!
    fileUrl: String!
    category: Category!
    createdAt: String!
    userId: ID!
    title: String!
    audioUrl: String!
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
    token: String!
    user: User
  }

  type Query {
    users: [User!]!
    user(username: String!): User
    getSounds: [Sound!]!
    getSound(id: ID!): Sound
    getCategories: [Category!]!
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSound(name: String!, fileUrl: String!, category: ID!): Sound!
    deleteSound(id: ID!): Boolean!
    addCategory(name: String!): Category!
    deleteCategory(id: ID!): Boolean!
    createSound(userId: ID!, title: String!, audioUrl: String!): Sound!
  }
`;
export default typeDefs;
