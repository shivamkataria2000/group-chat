import { SchemaComposer } from "graphql-compose";

import db from "../utils/db"; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./user";
import { GroupsQuery, GroupsMutation } from "./groups";

schemaComposer.Query.addFields({
  ...UserQuery,
  ...GroupsQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...GroupsMutation,
});

export default schemaComposer.buildSchema();
