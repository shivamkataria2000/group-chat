import { Group, GroupTC } from "../models/group";

const GroupQuery = {
  groupById: GroupTC.getResolver("findById"),
  groupByIds: GroupTC.getResolver("findByIds"),
  groupOne: GroupTC.getResolver("findOne"),
  groupMany: GroupTC.getResolver("findMany"),
  groupCount: GroupTC.getResolver("count"),
  groupConnection: GroupTC.getResolver("connection"),
  groupPagination: GroupTC.getResolver("pagination"),
};

const GroupMutation = {
  groupCreateOne: GroupTC.getResolver("createOne"),
  groupCreateMany: GroupTC.getResolver("createMany"),
  groupUpdateById: GroupTC.getResolver("updateById"),
  groupUpdateOne: GroupTC.getResolver("updateOne"),
  groupUpdateMany: GroupTC.getResolver("updateMany"),
  groupRemoveById: GroupTC.getResolver("removeById"),
  groupRemoveOne: GroupTC.getResolver("removeOne"),
  groupRemoveMany: GroupTC.getResolver("removeMany"),
};

export { GroupQuery, GroupMutation };
