"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMutation = exports.UserQuery = void 0;

var _user = require("../models/user");

const UserQuery = {
  userById: _user.UserTC.getResolver("findById"),
  userByIds: _user.UserTC.getResolver("findByIds"),
  userOne: _user.UserTC.getResolver("findOne"),
  userMany: _user.UserTC.getResolver("findMany"),
  userCount: _user.UserTC.getResolver("count"),
  userConnection: _user.UserTC.getResolver("connection"),
  userPagination: _user.UserTC.getResolver("pagination")
};
exports.UserQuery = UserQuery;
const UserMutation = {//   userCreateOne: UserTC.getResolver("createOne"),
  //   userCreateMany: UserTC.getResolver("createMany"),
  //   userUpdateById: UserTC.getResolver("updateById"),
  //   userUpdateOne: UserTC.getResolver("updateOne"),
  //   userUpdateMany: UserTC.getResolver("updateMany"),
  //   userRemoveById: UserTC.getResolver("removeById"),
  //   userRemoveOne: UserTC.getResolver("removeOne"),
  //   userRemoveMany: UserTC.getResolver("removeMany"),
};
exports.UserMutation = UserMutation;