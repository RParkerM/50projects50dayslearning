const settings = document.querySelectorAll(".setting");
const result = document.querySelector("#result");

const passLengthEl = settings[0].querySelector("input");
const uppercaseEl = settings[1].querySelector("input");
const lowercaseEl = settings[2].querySelector("input");
const numbersEl = settings[3].querySelector("input");
const symbolsEl = settings[4].querySelector("input");
const genPasswordEl = document.getElementById("generate");

const clipboardEl = document.getElementById("clipboard");

let passLength = passLengthEl.value;
let includeUppercase = uppercaseEl.value;
let includeLowercase = lowercaseEl.value;
let includeNumbers = numbersEl.value;
let includeSymbols = symbolsEl.value;

let allowedSymbols = [];

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

genPasswordEl.addEventListener("click", genPass);

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  //   return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateSymbolsAllowed() {
  passLength = passLengthEl.value;
  includeUppercase = uppercaseEl.checked;
  includeLowercase = lowercaseEl.checked;
  includeNumbers = numbersEl.checked;
  includeSymbols = symbolsEl.checked;
  allowedSymbols = [];
  if (includeUppercase) allowedSymbols.push(getRandomUpper);
  if (includeLowercase) allowedSymbols.push(getRandomLower);
  if (includeNumbers) allowedSymbols.push(getRandomNumber);
  if (includeSymbols) allowedSymbols.push(getRandomSymbol);
}

function genPass() {
  updateSymbolsAllowed();
  if (allowedSymbols.length === 0) {
    console.log("I can't make a password with no characters");
    return;
  }
  let pass = "";
  for (let i = 0; i < passLength; i++) {
    pass += allowedSymbols[Math.floor(Math.random() * allowedSymbols.length)]();
  }
  result.innerText = pass;
}
