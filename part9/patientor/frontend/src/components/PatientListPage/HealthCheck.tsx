import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <Typography>
        {entry.date} {entry.description}
      </Typography>
    </>
  );
};

export default HealthCheck;
