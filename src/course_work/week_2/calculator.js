// Copy + paste the below, commented out code above the "App" function in src/App.js

// let result;
// // take the operator input
// const operator = prompt('Enter operator ( either +, -, * or / ): ');

// // take the operand input
// const number1 = parseFloat(prompt('Enter first number: '));
// const number2 = parseFloat(prompt('Enter second number: '));

// switch(operator) {
//     case '+':
//          result = number1 + number2;
//         console.log(`${number1} + ${number2} = ${result}`);
//         break;

//     case '-':
//          result = number1 - number2;
//         console.log(`${number1} - ${number2} = ${result}`);
//         break;

//     case '*':
//          result = number1 * number2;
//         console.log(`${number1} * ${number2} = ${result}`);
//         break;

//     case '/':
//          result = number1 / number2;
//         console.log(`${number1} / ${number2} = ${result}`);
//         break;

//     default:
//         console.log('Invalid operator');
//         break;
// };

// turning the above into 
function display(val){
  document.getElementById('result').value += val
  return val
}

function solve(){
  let x = document.getElementById('result').value
  let y = eval(x);
  document.getElementById('result').value = y
  return y
}

function clearScreen(){
  document.getElementById('result').value = ''
}
