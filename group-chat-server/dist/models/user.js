"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTC = exports.User = exports.UserSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  }
}, {
  collection: "users"
});
exports.UserSchema = UserSchema;
UserSchema.plugin(_mongooseTimestamp.default);
UserSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const User = _mongoose.default.model("User", UserSchema);

exports.User = User;
const UserTC = (0, _graphqlComposeMongoose.composeWithMongoose)(User);
exports.UserTC = UserTC;