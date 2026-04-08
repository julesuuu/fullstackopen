interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseData = (args: string[]): { target: number; hours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target value is not a number");

  const hours = args.slice(3).map((arg) => {
    const value = Number(arg);
    if (isNaN(value)) throw new Error(`Value "${arg}" is not a number`);
    return value;
  });

  if (hours.length === 0) throw new Error("No exercises hours provided");

  return { target, hours };
};

export const calculateExercises = (
  averageTime: number[],
  targetAmount: number,
): Result => {
  let rating: number;
  let ratingDescription: string;
  const periodLength = averageTime.length;
  const trainingDays = averageTime.filter((n) => n > 0).length;
  const target = targetAmount;
  const average = averageTime.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  if (average <= 1) {
    rating = 1;
    ratingDescription = "touch some grass";
  } else if (average <= 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "not too shabby";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseData(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
