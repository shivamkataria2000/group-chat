import { SchemaComposer } from "graphql-compose";

import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./user";
import { GroupQuery, GroupMutation } from "./group";
import { Group, GroupTC } from "../models/group";
import { PubSub } from "graphql-subscriptions";

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
      console.log(resp);
      return resp.payload;
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
