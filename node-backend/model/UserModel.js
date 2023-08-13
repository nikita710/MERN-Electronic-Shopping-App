import mongoose, { Schema } from "mongoose";

const schemaUser = new Schema({
  firstName: { type: "String" },
  lastName: { type: "String" },
  email: { type: "String", required: true, unique: true },
  password: { type: "String", required: true },
  role: { type: "String", default: "user", required: true },
  addresses: { type: [Schema.Types.Mixed] },
  orders: { type: [Schema.Types.Mixed] },
});

const virtual = schemaUser.virtual("id");
virtual.get(function () {
  return this._id;
});

schemaUser.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const User = mongoose.model("User", schemaUser);
