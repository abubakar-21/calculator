let display = document.getElementById("display");
let keys = document.getElementsByClassName("key");
let result;
let operation = new Array;
let value = new Array;
let totResult = 0;
let checkEqual, printCalc = false;
const maxDigits = 21;
let clearBtn = document.getElementById("clear");

// Clearing the display
function clear() {
    reset();
    console.log(value, operation, totResult);
    display.value = '0';
    display.style.fontSize = "28px";
    
}

// Deletes last digit
function del() {

    if (display.value.length === 1) {
        display.value = '0';
        display.style.fontSize = "28px";
    } else { 
        display.type = 'text';
        display.value = display.value.slice(0, -1); 
    }
    fontSizeBackwards();
    
}

// Printing on the screen!
function printThings(Num) {

    display.type = 'text';
    display.value = Num;
    fontSize();
    
}

// Dot function, it checks if there's already a dot in the display.
function dot() {

    if (display.value.includes('.')) {
        return
    } else {
        display.type = 'text';
        display.value = display.value + '.';
        printThings(display.value);
    }
}

function fontSize() {
    for (let index = 0; index <= display.value.length; index++) {
        if (display.value.length === 32 || display.value.length > 32) {
            display.style.fontSize = "8px";
        } else if (display.value.length === 28 || display.value.length > 28) {
            display.style.fontSize = "12px";
        } else if (display.value.length === 21 || display.value.length > 21) {
            display.style.fontSize = "16px";
        } else if (display.value.length === 14 || display.value.length > 14) {
            display.style.fontSize = "18px";
        } else if (display.value.length >= 7 && display.value.length < 14) {
            display.style.fontSize = "22px";
        } else{
            return
        } 
    }
}

function fontSizeBackwards() {
    for (let index = 0; index <= display.value.length; index++) {
        if (display.value.length <= 14 && display.value.length > 7) {
            display.style.fontSize = "18px";
        } else if (display.value.length <= 7) {
            display.style.fontSize = "28px";
        } else{
            return
        }
    }
}

function reset() {
    value[0] = 0;
    value[1] = 0;
    operation = [];
    totResult = 0;
}

function numberPress(num) {
    if (display.value === '0') {
        display.style.fontSize = "28px";
        display.value = num;
        
    }
    else{
            
        if (display.value.length >= maxDigits) {
            alert("Max-digits: " + `${maxDigits}` + "\nAmount of digits on the screen: " + `${display.value.length}` )
            return
        } else{
            display.value += num;
            currentValue = display.value;
        }      
    }
    fontSize();
    printThings(display.value);
}

function doTheJob() {
    for (let i = 0; i < 1;) {
        console.log(value[0]);
    
        if (value.length <= 2) {
            totResult = calc(Number.parseFloat(value[i]), Number.parseFloat(value[i + 1]), operation[i]);
            value[0] = totResult;
        } else{
            return
        }
        i++;
        
    }
}


function operators(op) {

    totResult = value[0];

    if (op === '=') {

        checkEqual = true;
        value[1] = Number.parseFloat(display.value);
        doTheJob();
        value[1] = [];
        operation = [];
        printCalc = true;
    } else {
        
        if (checkEqual && totResult != 0) {
            value[0] = Number.parseFloat(totResult);
            operation.push(op);
        } else{
            value[0] = Number.parseFloat(display.value);
            operation.push(op);
            console.log(value[0]);

        }

        if (operation.length >= 2) {

            value[0] = totResult;
            value[1] = Number.parseFloat(display.value);
            console.log(value[0] + ' value: 0');
            doTheJob();
            console.log(Number.parseFloat(totResult));
            console.log(value, operation);
            value[1] = [];
            operation = [];
            operation.push(op);
            value[0] = totResult;

        }
        
        printCalc = false;
        console.log(operation);

    };
        
}

function calc(x, y, op) {

        switch (op){
            
            case '+':
                result = x + y;
                return x + y;

            case '-':
                result = x - y;
                return x - y;

            case '/':
                result = x / y;
                return x / y;

            case 'x':
                result = x * y;
                return x * y;

            default:
                return
            
    }    
}

function handleBtnPress(button) {

    if (button.id === 'dot') {
        dot();
    } else if (button.id === 'clear') {
        clear();
    } else if (button.id === 'negate') {
        printThings(display.value = -display.value);
    } else if (button.id === 'percent') {  
        printThings(display.value *= 0.01);
    } else if (button.id === 'del') {
        del();
    } else if (!isNaN(button.id)) {
        numberPress(Number.parseInt(button.innerHTML));
    } else{
        operators(button.innerHTML);
        
        if (printCalc) {
            printThings(totResult);
        }
        else{
            display.value = "";
        }
    }

}

for (let i = 0; i < keys.length; i++) {

    keys[i].addEventListener('click', () => handleBtnPress(keys[i]));

}
