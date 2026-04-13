import { Patient, Entry, Diagnosis } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryComponent = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const PatientEntries = ({ patient, diagnoses }: { patient: Patient; diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
        <EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientEntries;
