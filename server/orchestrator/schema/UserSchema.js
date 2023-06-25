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

    input NewUser {
      username: String
      email: String
      password: String
      phoneNumber: String
      address: String
    }

    type Query {
      findUsers: [User]
      findUserById(id: ID!): User
    }

    type Mutation {
      addUser(input: NewUser!): ResponseMessage
      deleteUser(id: ID!): ResponseMessage
    }
`;

const resolvers = {
  Query: {
    findUsers: async () => {
      try {
        const usersCache = await redis.get("users");

        if (usersCache) {
          const users = JSON.parse(usersCache);
          return users;
        } else {
          const { data } = await axios({
            method: "get",
            url: SERVER_USER_URL + "/users",
          });
          await redis.set("users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        return error;
      }
    },

    findUserById: async (_, args) => {
      try {
        const { data } = await axios({
          method: "get",
          url: SERVER_USER_URL + "/users/" + args.id,
        });
        await redis.del("users");
        return data;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios({
          method: "post",
          url: SERVER_USER_URL + "/users/register",
          data: args.input,
        });

        const response = {
          message: `User has been created.`,
        };
        await redis.del("users");
        return response;
      } catch (error) {
        return error;
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { data } = await axios({
          method: "delete",
          url: SERVER_USER_URL + "/users/" + args.id,
        });

        const response = {
          message: `User has been deleted.`,
        };
        await redis.del("users");
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
