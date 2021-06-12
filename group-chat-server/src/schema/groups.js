import { Groups, GroupsTC } from "../models/groups";

const GroupsQuery = {
  groupsById: GroupsTC.getResolver("findById"),
  groupsByIds: GroupsTC.getResolver("findByIds"),
  groupsOne: GroupsTC.getResolver("findOne"),
  groupsMany: GroupsTC.getResolver("findMany"),
  groupsCount: GroupsTC.getResolver("count"),
  groupsConnection: GroupsTC.getResolver("connection"),
  groupsPagination: GroupsTC.getResolver("pagination"),
};

const GroupsMutation = {
  groupsCreateOne: GroupsTC.getResolver("createOne"),
  groupsCreateMany: GroupsTC.getResolver("createMany"),
  groupsUpdateById: GroupsTC.getResolver("updateById"),
  groupsUpdateOne: GroupsTC.getResolver("updateOne"),
  groupsUpdateMany: GroupsTC.getResolver("updateMany"),
  groupsRemoveById: GroupsTC.getResolver("removeById"),
  groupsRemoveOne: GroupsTC.getResolver("removeOne"),
  groupsRemoveMany: GroupsTC.getResolver("removeMany"),
};

export { GroupsQuery, GroupsMutation };
