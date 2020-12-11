function displayResults(test, expected, addFunc) {
  let actual = addFunc(test);
  let result = actual == expected ? '[PASS]' : '[FAIL]';
  console.log(result + ' Expected: ' + expected + ' Actual: ' + actual);
}

let testCases = [
  //Question 1
  { test: '1,2,5', expected: 8 },
  { test: '6,7,8', expected: 21 },
  { test: '', expected: 0 },
  //Question 2
  { test: '1\n2,3', expected: 6 },
  { test: '1,\n2,4', expected: 7 },
  //Question 3
  { test: '//;\n1;3;4', expected: 8 },
  { test: '//$\n1$2$3', expected: 6 },
  { test: '//@\n2@3@8@', expected: 13 },
  //Question 4
  {
    test: '//@\n2@-3@8@5@-10@-2',
    expected: 'Negatives not allowed. -3,-10,-2',
  },
  { test: '6,-7,-8', expected: 'Negatives not allowed. -7,-8' },
  { test: '1,\n-2,4', expected: 'Negatives not allowed. -2' },
  //Bonus 1
  { test: '2, 1001', expected: 2 },
  { test: '2, 1, 500', expected: 503 },
  //Bonus 2
  { test: '//***\n1***2***3', expected: 6 },
  //Bonus 3
  { test: '//$,@\n1$2@3', expected: 6 },
];

function Add(numbers) {
  let controlCodeRegex = /(?<=\/\/)(.*?)(?=\n)/g; //Regex to look for the Control Code

  //Test the Regex to see if any matches
  if (new RegExp(controlCodeRegex).test(numbers)) {
    //Use the Control Code Regex to get our Delimiter Regex
    let delimiter = new RegExp('[' + numbers.match(controlCodeRegex)[0] + ']+');
    numbers = numbers
      .match(/\n(.*)/g)[0] //Get the other half of the string that's not the Control Code
      .split(delimiter);
  } else {
    //If no Control Code found, split on comma or newline
    numbers = numbers.split(/[\n,]+/);
  }

  numbers = numbers.map(Number); //Convert the array of strings into numbers
  let negativeNumbers = numbers.filter((number) => number < 0); //Filter the array for any negative numbers

  try {
    if (negativeNumbers.length > 0) {
      //If negativeNumbers contains anything, throw exception
      throw 'Negatives not allowed. ' + negativeNumbers;
    } else {
      //sum all of the numbers
      return numbers.reduce((sum, currentNumber) => {
        //ternary condition to ignore numbers largert than 1000
        return currentNumber <= 1000 ? sum + currentNumber : sum;
      });
    }
  } catch (exception) {
    return exception;
  }
}

//Apply Add function to each test case
testCases.forEach((testCase) => {
  displayResults(testCase.test, testCase.expected, Add);
});
