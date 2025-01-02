"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@apollo/client");
exports.registerUser = (0, client_1.gql) `
mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        profilePic
        
      }
    }
  }
`;
exports.loginUser = `
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        username
        profilePic
      }
    }
  }
`;
