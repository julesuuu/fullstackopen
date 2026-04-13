import { Patient, Entry } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryComponent = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientEntries = ({ patient }: { patient: Patient }) => {
  return (
    <div>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
        <EntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientEntries;
