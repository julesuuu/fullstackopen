export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// export type Gender = "male" | "female" | "other";

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NonSensitivePatients = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
