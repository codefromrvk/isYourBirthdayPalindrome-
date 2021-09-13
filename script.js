
function strReverse(str) {
  return str.split('').reverse().join('')
}


function checkPalindrome(str) {

  const reversedStr = strReverse(str)
  return str === reversedStr;

}

function numberToString(date) {

  var dateStr = { day: "", month: "", year: "" }

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();


  return dateStr;

}
function getAllDateFormats(date) {
  var dateStr = numberToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
  var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

  return [ddmmyyyy, mmddyy, yyyymmdd, ddmmyy, mmddyy, yyddmm]
}


function checkPalindromeForAllFormats(date) {
  var dateList = getAllDateFormats(date);
  // console.log(dateList)
  let palindrome = false;
  for (let i = 0; i < dateList.length; i++) {
    if (checkPalindrome(dateList[i])) {
      palindrome = true;
      break;
    }
  }
  return palindrome;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date){
  var day = date.day + 1;  
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

   // check for february
  if(month === 2){ 
    // check for leap year
    if(isLeapYear(year)){ 
       if(day > 29){ 
         day = 1;
         month++;  
       }
    }
    else {
       if(day > 28){
         day = 1;
         month++;  
       }
    }
  }
  // check for other months
  else {
    
    if(day > daysInMonth[month - 1]){ 
      day = 1; 
      month++;  
    }
  }

 
  if(month > 12){
    month = 1;
    year++; 
  }

  return {
    day: day,  
    month: month,
    year: year
  };
}


function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

var dateInput = document.querySelector('#bday-input');
var check = document.querySelector('#check');
var output = document.querySelector('#output');
console.log(dateInput.value)

function clickHandler(e){
  var bdayStr = dateInput.value; // 2020-10-11
  
  if(bdayStr !== ''){
    var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };
    
    var isPalindrome = checkPalindromeForAllFormats(date);

    if(isPalindrome){
       output.innerText = 'Wohoo! your birthday is a palindrome!! 🥳';
    }
    else {
      var [ctr, nextDate] = getNextPalindromeDate(date);

      output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! `;
    }
  }
  else{
    output.innerText ="Please enter your birthday!"
  }
}

check.addEventListener('click', clickHandler);


