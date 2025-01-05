"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const client_1 = require("@apollo/client");
exports.getUserProfile = (0, client_1.gql) `
query ProfilePages ($id: ID!) {
user (id: $id) { 
username
profilePic

}
}
`;
