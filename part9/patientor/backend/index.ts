import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses.ts";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
