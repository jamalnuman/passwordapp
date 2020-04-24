const resultsElement = document.getElementById('result');
const clipboardElement = document.getElementById('clipboard')
const lengthElement = document.getElementById('length')
const upperCaseElement = document.getElementById('uppercase')
const lowercaseElement = document.getElementById('lowercase')
const numbersElement = document.getElementById('numbers')
const symbolsElement = document.getElementById('symbols')
const generateElement = document.getElementById('generate')

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumbers,
    symbol: getRandomSymbols
}

generateElement.addEventListener('click' , () => {
    const length = +lengthElement.value;
    const hasUpper = upperCaseElement.checked;//this is how you get the value of a checkbox
    const hasLower = lowercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    resultsElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length){

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    //what if all the boxes are unchecked?
    if (typesCount === 0){return}

    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor((Math.random() * typesCount));
        const functionName = Object.keys(typesArray[randomIndex])[0] 
        generatedPassword += randomFunction[functionName]()
    }
        const finalPassword = generatedPassword.slice(0,length)
        return finalPassword;//The password is now generated and the value is stored in the resultsElement due to line 29
}

//to randomly select lowercase letters, upcase letters, numbers and symbols
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumbers(){
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)//important to note the "+" at the beginning..that is turning the string into a number
}

function getRandomSymbols(){
    let symbols = '~!@#$%^&*(){}[]?/><.,'
    return symbols[Math.floor(Math.random() * symbols.length)]
}