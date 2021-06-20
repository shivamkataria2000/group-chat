import { SchemaComposer } from "graphql-compose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./user";
import { GroupQuery, GroupMutation } from "./group";
import { Group, GroupTC } from "../models/group";
import { PubSub } from "graphql-subscriptions";
import { User, UserTC } from "../models/user";
const LoginTC = schemaComposer.createObjectTC(`
  type Login {
    success: Boolean!
    jwt: String
    message:String!
    name:String
    email:String
    _id:String
  }
`);

const pubsub = new PubSub();

schemaComposer.Mutation.addFields({
  chatPushToArray: {
    type: GroupTC,
    args: {
      groupId: "String!",
      valueToPush: `input ChatInput {
      message: String!,
      user:String!
    }`,
    },
    resolve: async (source, args, context, info) => {
      if (!context.req || !context.req.user) {
        throw new Error("You must be authorized");
      }
      const group = await Group.updateOne(
        { _id: args.groupId },
        { $push: { chat: args.valueToPush } }
      );
      if (!group) return null; // or gracefully return an error etc...
      const changedGroup = await Group.findOne({ _id: args.groupId });
      pubsub.publish("MESSAGE_PUSHED", { payload: changedGroup });
      return changedGroup; // return the record
    },
  },
});
schemaComposer.Subscription.addFields({
  group: {
    type: GroupTC,
    subscribe: () => pubsub.asyncIterator(["MESSAGE_PUSHED"]),
    resolve: (resp, args) => {
      return resp.payload;
    },
  },
});
schemaComposer.Query.addFields({
  loggedIn: {
    type: LoginTC,
    resolve: async (source, args, context, info) => {
      if (!context.req || !context.req.user) {
        return { success: false, message: "User Not Logged In" };
      } else {
        const user = await User.findOne({ email: context.req.user.email });

        return {
          success: true,
          name: user.name,
          _id: user.id,
          email: user.email,
          message: "User Logged In",
        };
      }
    },
  },
});
schemaComposer.Mutation.addFields({
  login: {
    type: LoginTC,
    args: {
      email: "String!",
      password: "String!",
    },
    resolve: async (source, args, context, info) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        return { success: false, message: "No user with that email" };
      }
      const valid = await bcrypt.compare(args.password, user.password);

      if (!valid) {
        return { success: false, message: "Invalid Password" };
      }
      // return json web token
      const jwt = jsonwebtoken.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      context.res.header("Authorization", "Bearer " + jwt);

      return {
        success: true,
        message: "Login Successful",
        email: user.email,
        name: user.name,
        _id: user._id,
        jwt,
      };
    },
  },
});
schemaComposer.Mutation.addFields({
  signUp: {
    type: LoginTC,
    args: {
      email: "String!",
      password: "String!",
      name: "String!",
    },
    resolve: async (source, args, context, info) => {
      const user = await User.create({
        name: args.name,
        email: args.email,
        password: await bcrypt.hash(args.password, 10),
      });
      // return json web token
      return {
        success: true,
        message: "Login Successful",
        email: user.email,
        name: user.name,
        _id: user._id,
        jwt: jsonwebtoken.sign(
          { id: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        ),
      };
    },
  },
});

schemaComposer.Query.addFields({
  ...UserQuery,
  ...GroupQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...GroupMutation,
});

export default schemaComposer.buildSchema();
