import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true, unique: true },
});

const virtual = categoriesSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

categoriesSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Categories = mongoose.model("Categories", categoriesSchema);
