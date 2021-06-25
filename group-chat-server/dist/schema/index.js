"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlCompose = require("graphql-compose");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../utils/db"));

var _user = require("./user");

var _group = require("./group");

var _group2 = require("../models/group");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _user2 = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
const schemaComposer = new _graphqlCompose.SchemaComposer();
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
const pubsub = new _graphqlSubscriptions.PubSub();
schemaComposer.Mutation.addFields({
  chatPushToArray: {
    type: _group2.GroupTC,
    args: {
      groupId: "String!",
      valueToPush: `input ChatInput {
      message: String!,
      user:String!
    }`
    },
    resolve: async (source, args, context, info) => {
      if (!context.req || !context.req.user) {
        throw new Error("You must be authorized");
      }

      const group = await _group2.Group.updateOne({
        _id: args.groupId
      }, {
        $push: {
          chat: args.valueToPush
        }
      });
      if (!group) return null; // or gracefully return an error etc...

      const changedGroup = await _group2.Group.findOne({
        _id: args.groupId
      });
      pubsub.publish("MESSAGE_PUSHED", {
        payload: changedGroup
      });
      return changedGroup; // return the record
    }
  }
});
schemaComposer.Subscription.addFields({
  group: {
    type: _group2.GroupTC,
    subscribe: () => pubsub.asyncIterator(["MESSAGE_PUSHED"]),
    resolve: (resp, args) => {
      return resp.payload;
    }
  }
});
schemaComposer.Query.addFields({
  loggedIn: {
    type: LoginTC,
    resolve: async (source, args, context, info) => {
      if (!context.req || !context.req.user) {
        return {
          success: false,
          message: "User Not Logged In"
        };
      } else {
        const user = await _user2.User.findOne({
          email: context.req.user.email
        });
        return {
          success: true,
          name: user.name,
          _id: user.id,
          email: user.email,
          message: "User Logged In"
        };
      }
    }
  }
});
schemaComposer.Mutation.addFields({
  login: {
    type: LoginTC,
    args: {
      email: "String!",
      password: "String!"
    },
    resolve: async (source, args, context, info) => {
      const user = await _user2.User.findOne({
        email: args.email
      });

      if (!user) {
        return {
          success: false,
          message: "No user with that email"
        };
      }

      const valid = await _bcrypt.default.compare(args.password, user.password);

      if (!valid) {
        return {
          success: false,
          message: "Invalid Password"
        };
      } // return json web token


      const jwt = _jsonwebtoken.default.sign({
        id: user._id,
        email: user.email,
        name: user.name
      }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      context.res.header("Authorization", "Bearer " + jwt);
      return {
        success: true,
        message: "Login Successful",
        email: user.email,
        name: user.name,
        _id: user._id,
        jwt
      };
    }
  }
});
schemaComposer.Mutation.addFields({
  signUp: {
    type: LoginTC,
    args: {
      email: "String!",
      password: "String!",
      name: "String!"
    },
    resolve: async (source, args, context, info) => {
      const user = await _user2.User.create({
        name: args.name,
        email: args.email,
        password: await _bcrypt.default.hash(args.password, 10)
      }); // return json web token

      return {
        success: true,
        message: "Login Successful",
        email: user.email,
        name: user.name,
        _id: user._id,
        jwt: _jsonwebtoken.default.sign({
          id: user._id,
          email: user.email,
          name: user.name
        }, process.env.JWT_SECRET, {
          expiresIn: "1d"
        })
      };
    }
  }
});
schemaComposer.Query.addFields({ ..._user.UserQuery,
  ..._group.GroupQuery
});
schemaComposer.Mutation.addFields({ ..._user.UserMutation,
  ..._group.GroupMutation
});

var _default = schemaComposer.buildSchema();

exports.default = _default;