import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  selectPaymentMethod: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._it;
  },
});

export const Orders = mongoose.model("Orders", orderSchema);
