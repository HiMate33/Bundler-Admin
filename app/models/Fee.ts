import mongoose, { Schema, model, models } from "mongoose";

const FeeSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true, default: "0" }
  },
  { timestamps: true }
);

export default models.Fee || model("Fee", FeeSchema);
