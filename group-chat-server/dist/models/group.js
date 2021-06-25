"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupTC = exports.Group = exports.GroupSchema = exports.ChatSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ChatSchema = new _mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});
exports.ChatSchema = ChatSchema;
const GroupSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  chat: [ChatSchema]
}, {
  collection: "group"
});
exports.GroupSchema = GroupSchema;
GroupSchema.plugin(_mongooseTimestamp.default);
GroupSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Group = _mongoose.default.model("Group", GroupSchema);

exports.Group = Group;
const GroupTC = (0, _graphqlComposeMongoose.composeWithMongoose)(Group);
exports.GroupTC = GroupTC;