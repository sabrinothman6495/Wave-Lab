const typeDefs = `
<<<<<<< HEAD

=======
  "A user account in the system"
>>>>>>> origin
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
<<<<<<< HEAD
    id: ID!
    name: String!
    fileUrl: String!
    category: Category!
    createdAt: String!
=======
    _id: ID!
>>>>>>> origin
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

<<<<<<< HEAD
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
=======
  "Instrument configuration for a sound recording"
  type Instrument {
    piano: Boolean!
    guitar: Boolean!
    trumpet: Boolean!
  }

  "Input for creating a new user"
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  "Input for sound instrument configuration"
  input InstrumentInput {
    piano: Boolean!
    guitar: Boolean!
    trumpet: Boolean!
  }

  "Authentication response containing token and user data"
  type Auth {
    token: String!
    user: User!
  }

  type Query {
    "Get all users (admin only)"
    users: [User!]!

    "Get a user by email"
    user(email: String!): User

    "Get all sounds for the logged-in user"
    getSounds: [Sound!]!

    "Get a specific sound by ID"
    getSound(_id: ID!): Sound

    "Get the currently logged-in user's profile"
>>>>>>> origin
    me: User
  }

  type Mutation {
<<<<<<< HEAD
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSound(name: String!, fileUrl: String!, category: ID!): Sound!
    deleteSound(id: ID!): Boolean!
    addCategory(name: String!): Category!
    deleteCategory(id: ID!): Boolean!
    createSound(userId: ID!, title: String!, audioUrl: String!): Sound!
=======
    "Create a new user account"
    addUser(input: UserInput!): Auth

    "Log in to an existing account"
    login(email: String!, password: String!): Auth

    "Create a new sound recording"
    createSound(
      title: String!
      audioData: String!
      instrument: InstrumentInput!
      duration: Float
      waveformData: [Float]
      frequencyData: [Float]
    ): Sound!

    "Delete a sound recording"
    deleteSound(_id: ID!): Boolean!

    "Update user profile information"
    updateUserProfile(
      firstName: String
      lastName: String
    ): User!
>>>>>>> origin
  }
`;
export default typeDefs;
