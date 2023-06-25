const axios = require("axios");
const redis = require("../config/redisConnection");

const SERVER_USER_URL = process.env.SERVER_USER_URL || "http://localhost:4001";
const SERVER_APP_URL = process.env.SERVER_APP_URL || "http://localhost:4002";

const typeDefs = `#graphql
    type User {
      _id: String
      username: String
      email: String
      phoneNumber: String
      address: String
    }

    type ResponseMessage {
      message: String
    }

    type Query {
      findUsers: [User]
    }

    type Mutation {
      deleteUser(id: ID!): ResponseMessage
    }
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

module.exports = [typeDefs, resolvers];
