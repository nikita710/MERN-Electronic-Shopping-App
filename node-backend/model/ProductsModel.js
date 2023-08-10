import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, "wrong minimum price"],
    max: [10000, "wrong maximum price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "invalid minimum discount rate"],
    max: [100, "invalid maximum discount rate"],
    required: true,
  },
  rating: {
    type: Number,
    min: [0, "invalid minimum rating"],
    max: [5, "invalid maximum rating"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "invalid minimum stock"],
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Products = mongoose.model("Products", productSchema);
