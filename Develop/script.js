var configuration = {
  "Upper Case Letters": false, 
  "Lower Case Letters": false, 
  "Special Characters": false, 
  "Numbers": false,
  count: 0,
}

var newPassword = [];
var numberToGenerate;
var currentCountRemaining;
var choices=["Upper Case Letters", "Lower Case Letters", "Special Characters", "Numbers"];


var LCL = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var UCL = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","y","Z"];
var number = [1,2,3,4,5,6,7,8,9,0];
var Special = ["!","@","#","$","%","^","&","*","(",")","_","+"];

function createPromptMessage(val, firstAttempt) {
  var message = `Would you like to use ${val}. Please enter 'Yes' or 'No'`;
  var userInput = prompt(firstAttempt ? `${message}` : `Invalid Attempt. ${message}`);
  if (userInput.toUpperCase() === 'YES') {
    configuration[val] = true;
    configuration.count++;
    return;
  } else if(userInput.toUpperCase() === 'NO') {
    return;
  } else {
      createPromptMessage(val, false);
  }
}


function createPasswordLength(firstAttempt) {
  var message = 'How many characters would you like your password to be? Please select a number between 8 and 124.'
  var passwordLength = parseFloat(prompt(firstAttempt ? `${message}` : `Invalid Attempt. ${message}`));
  if (isNaN(passwordLength) || passwordLength <= 7 || passwordLength >= 125) {
   createFormLength(false); 
  }
  return passwordLength;
}

function checkForEntry() {
  var responses = Object.values(configuration)
  if(responses.includes(true)) {
    return true;
  } else {
    alert('You must select at least one character type. Please try again.');
    return false;
  }
}

function randomizePassword(val) {
  if (configuration[val]) {
    var numberToGenerate = Math.floor(Math.random() * currentCountRemaining - configuration.count -1)
    if (configuration.count === 1) {
      numberToGenerate = currentCountRemaining;
    } else if (numberToGenerate <= 0) {
      numberToGenerate = 1;
    }
     currentCountRemaining -= numberToGenerate;
     for( var i = 0; i < numberToGenerate; i++) {
       var randomCharacter;
      switch (val) {
        case "Lower Case Letters" : randomCharacter = LCL[Math.floor(Math.random() * (LCL.length -1))];
        break;
        case "Upper Case Letters": randomCharacter = UCL[Math.floor(Math.random() * (UCL.length -1))];
        break;
        case "Numbers" : randomCharacter = number[Math.floor(Math.random() * (number.length -1))];
        break;
        case "Special Characters" : randomCharacter = Special[Math.floor(Math.random() * (Special.length -1))];
        break;
      }
       if (newPassword.length === 0) {
         newPassword.push(randomCharacter)
       } else {
         var randomIndex = Math.floor(Math.random() * newPassword.length - 1);
         newPassword.splice(randomIndex, 0, randomCharacter)
       }
     }
     configuration.count--;
   }
}

function resetInitialPassword() {
  newPassword = [];
  numberToGenerate = '';
  currentCountRemaining = '';
  configuration = {
    "Upper Case Letters": false, 
    "Lower Case Letters": false, 
    "Special Characters": false, 
    "Numbers": false,
    count: 0,
  }
}

function createPassword(val) { 
  currentCountRemaining = val;
  for (var i = 0; i < choices.length; i++) {
    randomizePassword(choices[i])
  }
  return newPassword.join('');
}

function generatePassword() {
  var lengthCheck = createPasswordLength(true);
  for (var i = 0; i < choices.length; i++) {
    createPromptMessage(choices[i], true)
  }
  var entryCheck = checkForEntry()
  if(!entryCheck) return; 
  return createPassword(lengthCheck);
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");











// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  resetInitialPassword();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
