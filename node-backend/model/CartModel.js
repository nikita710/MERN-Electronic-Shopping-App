import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
