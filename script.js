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
const decimalBtn = document.querySelector("#dot-btn")

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
    decimalBtn.disabled = false;
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
    decimalBtn.disabled = false;
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
        firstNumber = String(Math.floor(operator(parseFloat(firstNumber),parseFloat(secondNumber))*10000)/10000);
    }

    display.textContent = firstNumber
    operator=undefined;
    secondNumber="";
    if(firstNumber.includes(".")){
        decimalBtn.disabled = true;
    }  
}

function handleDigitsClick(digit){
    if(digit==="."){
        decimalBtn.disabled = !decimalBtn.disabled;
    }
    if(!operator&&firstNumber==="0"){
        display.textContent = digit;
        firstNumber = digit;
    } else {
        display.textContent+=digit;
        if(!operator){
            firstNumber +=digit;
        } else {
            secondNumber +=digit;
        }
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


document.addEventListener("keydown", (e)=>{
    let operation ="";
        if(e.key>=0&&e.key<=9) {
            handleDigitsClick(e.key)
        } else if ((e.key==="."||e.key===",")&&!decimalBtn.disabled){
            handleDigitsClick(".")
        }else {
            switch(e.key){
                case "+":
                    operation = "plus";
                    break;
                case "-":
                    operation = "minus";
                    break;
                case "*":
                    operation = "multiply";
                    break;
                case "/":
                    operation = "divide";
                    break;
                case "Enter":
                case "=":
                    operation = "equal";
                    break;
                case "Backspace":
                    handleBackspace()
                    return;
                case "Delete":
                    handleClear();
                    return;
                default:
                    return;    
            }
        handleOperationsClick(operation)
            
        }
    }
)