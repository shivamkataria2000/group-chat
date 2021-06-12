import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";
import { composeWithMongoose } from "graphql-compose-mongoose";

export const ChatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: { type: Date, default: Date.now },
});
export const GroupSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  chat: [ChatSchema],
});

export const GroupsSchema = new Schema(
  {
    groups: [GroupSchema],
  },
  {
    collection: "groups",
  }
);

GroupsSchema.plugin(timestamps);

GroupsSchema.index({ createdAt: 1, updatedAt: 1 });

export const Groups = mongoose.model("Groups", GroupsSchema);
export const GroupsTC = composeWithMongoose(Groups);
