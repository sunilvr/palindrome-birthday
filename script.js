const inputDate = document.querySelector("#date-input");
const showButton = document.querySelector("#submit-button");
const output = document.querySelector("#output");

function reverseString(inputDateString){
  let reversedDateString = inputDateString.split('').reverse().join('');
  return reversedDateString;
}
function checkPalindrome(inputDateString){
  var isPalindrome = false;
  if (inputDateString === reverseString(inputDateString)){
    isPalindrome = true;
  }
  return isPalindrome;
}

function convertToString(inputDate){
  if(inputDate.day < 10){
    inputDate.day = '0' + inputDate.day;
  }else{
    inputDate.day = inputDate.day.toString();
  }
  if(inputDate.month < 10){
    inputDate.month = '0' + inputDate.month;
  }else{
    inputDate.month = inputDate.month.toString();
  }
  inputDate.year = inputDate.year.toString();
  return inputDate;
}

function getAllDateFormats(inputDate){
  birthDateFormats = [];
  birthDateFormats.push(inputDate.day + inputDate.month + inputDate.year);
  birthDateFormats.push(inputDate.month + inputDate.day + inputDate.year);
  birthDateFormats.push(inputDate.year + inputDate.month + inputDate.day);
  birthDateFormats.push(inputDate.day + inputDate.month + inputDate.year.slice(2));
  birthDateFormats.push(inputDate.month + inputDate.day + inputDate.year.slice(2));
  birthDateFormats.push(inputDate.year.slice(2) + inputDate.month + inputDate.day);

  return birthDateFormats;
}

function checkPalindromeForAllFormats(inputDates){
  let flag = false;
  for(let i = 0; i < inputDates.length; i++){
    if (checkPalindrome(inputDates[i])){
      flag = true;
      break;
    }
  }
  return flag;
}

function nextDate(inputDate){
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day = Number(inputDate.day) + 1;
  let month = Number(inputDate.month);
  let year = Number(inputDate.year);
  
  if (month === 2){
    if ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)){
      if (day > 29){
        day = 1;
        month += 1;
      }
    }else{
      if (day > 28){
        day = 1;
        month += 1;
      }
    }
  }else if(month === 12){
    if(day > 31){
      day = 1;
      month = 1;
      year += 1;
    }
  }
  else{
    if (day > daysInMonths[month - 1]){
      day = 1;
      month += 1;
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function nextPalindromeDate(dateInput){
  var nextCalendarDate = nextDate(dateInput);
  var counterVar = 0;
  var palindromeFlag = false;

  while(1){
    counterVar += 1;
    nextDateString = convertToString(nextCalendarDate);
    nextDateFormats = getAllDateFormats(nextDateString);
    palindromeFlag = checkPalindromeForAllFormats(nextDateFormats);
    if(palindromeFlag){
      console.log([counterVar, nextCalendarDate])
      return [counterVar, nextCalendarDate];
    }
    nextCalendarDate = nextDate(nextCalendarDate);
  }
}

function clickHandler(){
  if(inputDate.value){
      let dateInput = inputDate.value.split('-');
      let birthDate = {
      day: Number(dateInput[2]),
      month: Number(dateInput[1]),
      year: Number(dateInput[0]),
    }
    let birthDateString = convertToString(birthDate);
    let birthDates = [];
    var pFlag = false;

    birthDates = getAllDateFormats(birthDateString);
    pFlag = checkPalindromeForAllFormats(birthDates);
    if(pFlag){
      output.innerText = 'Woah, your birthdate is a palindrome!!!';
    }else{
      [counterValue, palindromeDate] = nextPalindromeDate(birthDate);
      output.innerText = (counterValue === 1) ?
      `Sorry😐, your birthday is not a palindrome.The next palindrome date is just a day away, i.e., on ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}.` :
      `Sorry😐, your birthday is not a palindrome.The next palindrome date is ${counterValue} days away, i.e., on ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}.`;
    } 
  }
}

showButton.addEventListener('click', clickHandler);