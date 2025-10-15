function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return b!==0?a/b:Infinity;
}

let firstNumber = "";
let secondNumber = "";
let operator;

function operate(a, b, operator){
    return operator(a,b);
}

const digitBtns = document.querySelector("#digit-buttons");
const display = document.querySelector("#display");
const operatorBtns = document.querySelector("#operator-buttons")

digitBtns.addEventListener("click", (e) => {
        if(e.target.tagName==="BUTTON"){
            handleDigitsClick(e.target.value);  
        }
    }
);

operatorBtns.addEventListener("click", (e) => {
        if(e.target.tagName==="BUTTON"){
            handleOperationsClick(e.target.value);
        }
    }
);

function handleOperationsClick(operation){
    if(operation==="clear"){
            handleClear();
            return
    } 
    if(operation==="backspace"){
            handleBackspace();
            return
    } 
    if(operator&&secondNumber!==""){
        handleEqual()
        operation= undefined;
    } 
    switch (operation) {
        case "plus":
            handleOperatorDisplay("+");
            operator = add;
            break;
        case "minus":
            handleOperatorDisplay("-");  
            operator = substract;
            break;
        case "multiply":
            handleOperatorDisplay("*"); 
            operator = multiply;
            break;
        case "divide":
            handleOperatorDisplay("/");  
            operator = divide;
            break; 
        case "equal":
            handleEqual();
            break;      
        default:
            break;
    }
}


function handleClear(){
    firstNumber = "";
    secondNumber = "";
    operator = undefined;
    display.textContent = "";
}

function handleOperatorDisplay(operatorsSign){
    if(operator === undefined && secondNumber === ""){
        display.textContent += operatorsSign;
    } else {
        display.textContent = firstNumber + operatorsSign;
    }
}


function handleEqual(){
    if(firstNumber===""){
        firstNumber = "0";
    } else if(secondNumber===""){
            operator= undefined;
    } else {       
        firstNumber = Math.floor(operator(parseFloat(firstNumber),parseFloat(secondNumber))*10000)/10000;
    }

    display.textContent = firstNumber
    operator=undefined;
    secondNumber="";        
}

function handleDigitsClick(digit){
    display.textContent+=digit;
    if(!operator){
        firstNumber +=digit;
    } else {
        secondNumber +=digit;
    }
}


function handleBackspace(){
    display.textContent = display.textContent.slice(0,-1);
    if(secondNumber!==""){
        secondNumber = secondNumber.slice(0,-1);
    } else if(operator&&secondNumber===""){
        operator= undefined;
    } else {
        firstNumber = firstNumber.slice(0,-1);
    }
}