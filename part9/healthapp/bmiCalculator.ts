const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters); // Math.pow(heightInMeters, 2)
  console.log("🚀 ~ :4 ~ calculateBmi ~ bmi:", bmi);

  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi < 24.9) {
    return "Normal range";
  } else if (bmi < 29.9) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
};

console.log(calculateBmi(180, 74));
