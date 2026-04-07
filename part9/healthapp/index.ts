import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator.ts";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res): void => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(404).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi: result,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
