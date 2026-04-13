import z from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type Gender = (typeof Gender)[keyof typeof Gender];
