import { Typography } from "@mui/material";
import { HospitalEntry } from "../../types";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <Typography>
        {entry.date} {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>{dc}</li>
        ))}
      </ul>
    </>
  );
};

export default Hospital;
