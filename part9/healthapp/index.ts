import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi: result,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((hour) => typeof hour !== "number") ||
    typeof target !== "number"
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
