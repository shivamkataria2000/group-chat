"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupMutation = exports.GroupQuery = void 0;

var _protect = require("../middlewares/protect");

var _group = require("../models/group");

const GroupQuery = {
  groupById: _group.GroupTC.getResolver("findById", [_protect.authMiddleware]),
  groupByIds: _group.GroupTC.getResolver("findByIds", [_protect.authMiddleware]),
  groupOne: _group.GroupTC.getResolver("findOne", [_protect.authMiddleware]),
  groupMany: _group.GroupTC.getResolver("findMany", [_protect.authMiddleware]),
  groupCount: _group.GroupTC.getResolver("count", [_protect.authMiddleware]),
  groupConnection: _group.GroupTC.getResolver("connection", [_protect.authMiddleware]),
  groupPagination: _group.GroupTC.getResolver("pagination", [_protect.authMiddleware])
};
exports.GroupQuery = GroupQuery;
const GroupMutation = {
  groupCreateOne: _group.GroupTC.getResolver("createOne", [_protect.authMiddleware]),
  groupCreateMany: _group.GroupTC.getResolver("createMany", [_protect.authMiddleware]),
  groupUpdateById: _group.GroupTC.getResolver("updateById", [_protect.authMiddleware]),
  groupUpdateOne: _group.GroupTC.getResolver("updateOne", [_protect.authMiddleware]),
  groupUpdateMany: _group.GroupTC.getResolver("updateMany", [_protect.authMiddleware]),
  groupRemoveById: _group.GroupTC.getResolver("removeById", [_protect.authMiddleware]),
  groupRemoveOne: _group.GroupTC.getResolver("removeOne", [_protect.authMiddleware]),
  groupRemoveMany: _group.GroupTC.getResolver("removeMany", [_protect.authMiddleware])
};
exports.GroupMutation = GroupMutation;