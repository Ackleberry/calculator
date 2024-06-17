class Calculator {
    constructor(display, precision) {
        this.display = display;
        this.PRECISION = 10 ** precision;
        this.clear();
    }

    clear() {
        this.currNum = '';
        this.prevNum = '';
        this.operator = '';
        this.op_complete = false;
    }

    isFull() {
        return calc.prevNum !== '' && calc.currNum !== '';
    }

    operate(op, a, b) {
        a = Number(a);
        b = Number(b);
        
        let res;
        switch(op) {
            case '+': 
                res = a + b;
            break;
            case '-':
                res = a - b;
            break;
            case '*':
                res = a * b;
            break;
            case '/':
                res = a / b;
            break;
            case '%':
                res = a % b;
            break;
            default:
                console.log("ERROR: Unknown operator.");
            break;
        }
    
        if (!Number.isInteger(res)) {
            res = Math.round(this.PRECISION * res) / this.PRECISION;
        }

        console.log(`A: ${a}, OP: ${op}, B: ${b}, RES: ${res}`);

        return res;
    }
}

const DISPLAY_CHAR_WIDTH = 16;

function isNumber(digit) {
    return (Number.isInteger(+digit) || digit === '.')
}

function isOperator(digit) {
    return (digit === '+' || digit === '-' || digit === '*' || digit === '/' || digit === '%')
}

function updateDisplay(num) {
    num = Number(num);
    if (!isFinite(num) || (num.toString().length >= DISPLAY_CHAR_WIDTH)) {
        return 'ERROR';
    }
    return num;
}

function numBtnHandler(event) {
    let input = event.target.innerText;
    if ((input === '.' && calc.currNum.includes('.')) 
        || calc.currNum.length >= DISPLAY_CHAR_WIDTH) {
        return;
    }

    calc.currNum = (calc.op_complete) ? input : (calc.currNum + input);
    display.innerText = calc.currNum;
    calc.op_complete = false;
}

function opBtnHandler(event) {
    let input = event.target.innerText;

    if (calc.isFull()) {
        calc.currNum = calc.operate(calc.operator, calc.prevNum, calc.currNum);
        display.innerText = updateDisplay(calc.currNum);
        calc.op_complete = true;
    }
    
    calc.prevNum = calc.currNum;
    calc.currNum = '';
    calc.operator = input;
}

function eqlBtnHandler(event) {
    if (calc.prevNum !== '' && calc.currNum !== '') {
        calc.currNum = calc.operate(calc.operator, calc.prevNum, calc.currNum);
        display.innerText = updateDisplay(calc.currNum);
        calc.op_complete = true;
        calc.prevNum = '';
    }
}

function delBtnHandler(event) {
    if (calc.op_complete === false) {
        calc.currNum = calc.currNum.slice(0, -1);
        display.innerText = calc.currNum;
    }
}

function clrBtnHandler(event) {
    calc.clear();
    display.innerText = '';
}

function signBtnHandler(event) {
    calc.currNum *= -1;
    display.innerText = calc.currNum;
}

let display = document.querySelector('.display');

const numBtns = document.querySelectorAll('.button-num');
numBtns.forEach((button) => { button.addEventListener('click', numBtnHandler) })

const opBtns = document.querySelectorAll('.button-op');
opBtns.forEach((button) => { button.addEventListener('click', opBtnHandler) })

const equalBtn = document.querySelector('.button-eql')
equalBtn.addEventListener('click', eqlBtnHandler)

const deleteBtn = document.querySelector('.button-del')
deleteBtn.addEventListener('click', delBtnHandler)

const clearBtn = document.querySelector('.button-clr')
clearBtn.addEventListener('click', clrBtnHandler)

const signBtn = document.querySelector('.button-sign')
signBtn.addEventListener('click', signBtnHandler)

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (isNumber(key)) {
        numBtns.forEach((button) => { if (button.innerText === key) button.click(); });
    } else if (isOperator(key)) {
        opBtns.forEach((button) => { if (button.innerText === key) button.click(); });
    } else if (key === '=' || key === 'Enter') {
        equalBtn.click();
    } else if (key === 'Backspace') {
        deleteBtn.click();
    } else if (key === 'Escape') {
        clearBtn.click();
    } else if (key === '_') {
        signBtn.click();
    }
});

const calc = new Calculator(display.innerText, 11);