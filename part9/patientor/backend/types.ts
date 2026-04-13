import z, { symbol } from "zod";

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

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type Gender = (typeof Gender)[keyof typeof Gender];

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

type OccupationalHealthcareEntryWithoutSickLeave = Omit<OccupationalHealthcareEntry, "sickLeave">;

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | OccupationalHealthcareEntryWithoutSickLeave
  | HealthCheckEntry;
