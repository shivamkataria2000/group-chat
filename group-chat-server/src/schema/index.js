import { SchemaComposer } from "graphql-compose";

import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./user";
import { GroupQuery, GroupMutation } from "./group";
import { Group, GroupTC } from "../models/group";

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
      const group = await Group.updateOne(
        { _id: args.groupId },
        { $push: { chat: args.valueToPush } }
      );
      if (!group) return null; // or gracefully return an error etc...
      return Group.findOne({ _id: args.groupId }); // return the record
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
