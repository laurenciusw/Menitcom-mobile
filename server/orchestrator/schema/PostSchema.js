const axios = require("axios");
const redis = require("../config/redisConnection");

const SERVER_USER_URL = process.env.SERVER_USER_URL || "http://localhost:4001";
const SERVER_APP_URL = process.env.SERVER_APP_URL || "http://localhost:4002";

const typeDefs = `#graphql
   type Post {
      id: ID
      title: String
      slug: String
      content: String
      imgUrl: String
      categoryId: Int
      userMongoId: String
      createdAt: String
      tags: [Tag]
      Category: Category
      User: User
    }

    type Tag {
      name: String
    }

    type Category {
      id: ID
      name: String
    }

    type User {
      _id: String
      username: String
      email: String
    }

    type Query {
      findPosts: [Post]
      findPostById(id: ID!): Post
    }

    type ResponseMessage {
      message: String
    }
    input NewPost {
      title: String
      content: String
      imgUrl: String
      categoryId: Int
      userMongoId: String
      tags: [TagInput]
    }

    input EditPost {
      title: String
      content: String
      imgUrl: String
      categoryId: Int
      tags: [TagInput]
    }

    input TagInput {
      name: String
    }

    type Mutation {
      addPost(input:NewPost!): Post
      editPost(id: ID!, input: EditPost) : ResponseMessage
      deletePost(id: ID!) : ResponseMessage
    }
`;

const resolvers = {
  Query: {
    // get post
    findPosts: async () => {
      try {
        const postsCache = await redis.get("posts");

        if (postsCache) {
          const posts = JSON.parse(postsCache);
          return posts;
        } else {
          const { data: posts } = await axios({
            method: "get",
            url: SERVER_APP_URL + `/posts`,
          });

          const userRequests = posts.map(async (post) => {
            const { data: user } = await axios({
              method: "get",
              url: SERVER_USER_URL + `/users/${post.userMongoId}`,
            });

            post.User = user;
          });

          await Promise.all(userRequests);

          await redis.set("posts", JSON.stringify());
          return posts;
        }
      } catch (error) {
        return error;
      }
    },

    // get post by ID
    findPostById: async (_, args) => {
      try {
        const { data: post } = await axios({
          method: "get",
          url: SERVER_APP_URL + "/posts/" + args.id,
        });

        const { data: user } = await axios({
          method: "get",
          url: SERVER_USER_URL + `/users/${post.userMongoId}`,
        });

        post.User = user;

        return post;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    // create post
    addPost: async (_, args) => {
      try {
        const { data } = await axios({
          method: "post",
          url: SERVER_APP_URL + "/posts",
          data: args.input,
        });
        await redis.del("posts");
        return data;
      } catch (error) {
        return error;
      }
    },

    //edit post
    editPost: async (_, args) => {
      try {
        const { data } = await axios({
          method: "put",
          url: SERVER_APP_URL + "/posts/" + args.id,
          data: args.input,
        });

        await redis.del("posts");
        return data;
      } catch (error) {
        return error;
      }
    },

    // delete post
    deletePost: async (_, args) => {
      try {
        const { data } = await axios({
          method: "delete",
          url: SERVER_APP_URL + "/posts/" + args.id,
        });
        await redis.del("posts");
        return data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
