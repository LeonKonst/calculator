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
let operator = "";

function operate(a, b, operator){
    return operator(a,b);
}


const digitBtns = document.querySelector("#digit-buttons");
const display = document.querySelector("#display");



digitBtns.addEventListener("click", (e) => {
    if(e.target.tagName==="BUTTON"){
        display.textContent += e.target.value;
        firstNumber += e.target.value;
        
    }
}
);