const typeDefs = `

  type User {
    _id: ID!
    username: String!
    email: String!
    sounds: [Sound!]!
    createdAt: String!
    updatedAt: String!
  }

  "A sound recording with its associated metadata"
  type Sound {
    id: ID!
    name: String!
    fileUrl: String!
    category: Category!
    createdAt: String!
    userId: ID!
    title: String!
    audioData: String!  # Base64 encoded audio data
    instrument: Instrument!
    duration: Float
    waveformData: [Float]
    frequencyData: [Float]
    createdAt: String!
    updatedAt: String!
  }

  "Input for creating a new user"
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: String!
    user: User!
  }

  type Query {
    "Get all users (admin only)"
    users: [User!]!
    user(username: String!): User
    getSounds: [Sound!]!
    getSound(id: ID!): Sound
    getCategories: [Category!]!
    me: User
  }

  type Mutation {
    "Create a new user account"
    addUser(input: UserInput!): Auth

    "Log in to an existing account"
    login(email: String!, password: String!): Auth
    addSound(name: String!, fileUrl: String!, category: ID!): Sound!
    deleteSound(id: ID!): Boolean!
    addCategory(name: String!): Category!
    deleteCategory(id: ID!): Boolean!
    createSound(userId: ID!, title: String!, audioUrl: String!): Sound!
  }
`;
export default typeDefs;
