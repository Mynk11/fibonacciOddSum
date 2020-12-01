function fibonacciOddSum(num) {
  let start = 0;
  let next = 1;
  let current;
  let sum = 0;
  for (let i = 0; i <= num; i++) {
    current = start + next;
    start = next;
    next = current;
    if (current <= num && current % 2 !== 0) {
      sum = sum + current;
      console.log("start", sum);
    }
  }
  return sum + 1;
}
export { fibonacciOddSum };
