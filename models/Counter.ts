import mongoose, { Schema, models, model } from "mongoose";

/**
 * Generic sequence counter, keyed by string (e.g. "student-application-2026").
 * Used to generate gap-free, race-safe sequential Application IDs.
 */
const CounterSchema = new Schema({
  key: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export default models.Counter || model("Counter", CounterSchema);
