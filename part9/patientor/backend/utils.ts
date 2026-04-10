import { NewEntrySchema, type NewPatientEntry } from "./types.ts";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};
