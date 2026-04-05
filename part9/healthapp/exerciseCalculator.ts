interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  averageTime: number[],
  targetAmount: number,
): Result => {
  let rating = 0;
  let ratingDescription = "";
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
