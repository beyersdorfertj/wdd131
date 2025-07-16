const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

studentReport.forEach((score, index) => {
  if (score < LIMIT) {
    console.log(`Student ${index + 1} failed the limit with a score of ${score}.`);
  }
});

console.log("While Loop:");
let i= 0
while (i < studentReport.length) {
  if (studentReport[i] < LIMIT) {
    console.log(`Student ${i + 1} failed the limit with a score of ${studentReport[i]}.`);
  }
  i++;
}

