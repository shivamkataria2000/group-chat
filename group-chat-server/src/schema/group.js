import { authMiddleware } from "../middlewares/protect";
import { Group, GroupTC } from "../models/group";

const GroupQuery = {
  groupById: GroupTC.getResolver("findById", [authMiddleware]),
  groupByIds: GroupTC.getResolver("findByIds", [authMiddleware]),
  groupOne: GroupTC.getResolver("findOne", [authMiddleware]),
  groupMany: GroupTC.getResolver("findMany", [authMiddleware]),
  groupCount: GroupTC.getResolver("count", [authMiddleware]),
  groupConnection: GroupTC.getResolver("connection", [authMiddleware]),
  groupPagination: GroupTC.getResolver("pagination", [authMiddleware]),
};

const GroupMutation = {
  groupCreateOne: GroupTC.getResolver("createOne", [authMiddleware]),
  groupCreateMany: GroupTC.getResolver("createMany", [authMiddleware]),
  groupUpdateById: GroupTC.getResolver("updateById", [authMiddleware]),
  groupUpdateOne: GroupTC.getResolver("updateOne", [authMiddleware]),
  groupUpdateMany: GroupTC.getResolver("updateMany", [authMiddleware]),
  groupRemoveById: GroupTC.getResolver("removeById", [authMiddleware]),
  groupRemoveOne: GroupTC.getResolver("removeOne", [authMiddleware]),
  groupRemoveMany: GroupTC.getResolver("removeMany", [authMiddleware]),
};

export { GroupQuery, GroupMutation };
