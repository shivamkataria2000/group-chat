import { SchemaComposer } from "graphql-compose";

import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./user";
import { GroupQuery, GroupMutation } from "./group";

schemaComposer.Query.addFields({
  ...UserQuery,
  ...GroupQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...GroupMutation,
});

export default schemaComposer.buildSchema();
