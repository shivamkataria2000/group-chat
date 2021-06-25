"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

_mongoose.default.Promise = global.Promise;
console.log(process.env.MONGODB_URI);

const connection = _mongoose.default.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose.default.set("useCreateIndex", true);

connection.then(db => db).catch(err => {
  console.log(err);
});
var _default = connection;
exports.default = _default;