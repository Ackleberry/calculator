class Calculator {
    constructor(precision) {
        this.PRECISION = 10 ** precision;
        this.resetState();
    }

    get operator() {
        return this._operator;
    }

    set operator(val) {
        this._operator = val;
    }

    get currNum() {
        return this._currNum;
    }

    set currNum(val) {
        this._currNum = val;
    }

    get prevNum() {
        return this._prevNum;
    }

    set prevNum(val) {
        this._prevNum = val;
    }

    resetState() {
        this._currNum = '';
        this._prevNum = '';
        this._operator = '';
        this._op_complete = false;
    }

    has2Inputs() {
        return (calc._prevNum !== '' && calc._currNum !== '');
    }

    /**
     * Adds a digit onto the calculators current input
     * @param {string} digit 
     */
    inputAddDigit(digit) {
        calc._currNum = (calc._op_complete) ? digit : (calc._currNum + digit);
        calc._op_complete = false;
        return calc._currNum;
    }

    /**
     * Completes the current input and pushes the value onto the calculators stack
     */
    inputNumComplete() {
        calc._prevNum = calc._currNum;
        calc._currNum = '';
    }

    /**
     * True if the calculator is idle
     */
    isOperationComplete() {
        return this._op_complete;
    }

    /**
     * Computes the result based off the calculators inputs and operator
     */
    compute() {
        let a = Number(calc._prevNum);
        let b = Number(calc._currNum);
        let op = calc._operator;
        
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

        calc._op_complete = true;
        calc._prevNum = '';
        calc._currNum = res;
        return res;
    }
}

class Display {
    constructor(display) {
        this.DISPLAY_CHAR_WIDTH = 16;
        this._displayObj = display;
    }

    update(val) {
        val = Number(val);
        if (!isFinite(val) || (val.toString().length >= this.DISPLAY_CHAR_WIDTH)) {
            return 'ERROR';
        }
        this._displayObj.innerText = val;
    }

    clear() {
        this._displayObj.innerText = '';
    }
}

function isNumber(digit) {
    return (Number.isInteger(+digit) || digit === '.')
}

function isOperator(digit) {
    return (digit === '+' || digit === '-' || digit === '*' || digit === '/' || digit === '%')
}

function numBtnHandler(event) {
    let input = event.target.innerText;
    if ((input === '.' && calc.currNum.includes('.')) 
        || calc.currNum.length >= display.DISPLAY_CHAR_WIDTH) {
        return;
    }

    let val = calc.inputAddDigit(input);
    display.update(val);
}

function opBtnHandler(event) {
    let input = event.target.innerText;

    if (calc.has2Inputs()) {
        let res = calc.compute();
        display.update(res);
    }

    calc.inputNumComplete();
    calc.operator = input;
}

function eqlBtnHandler(event) {
    if (calc.has2Inputs()) {
        let res = calc.compute();
        display.update(res);
    }
}

function delBtnHandler(event) {
    if (!calc.isOperationComplete()) {
        calc.currNum = calc.currNum.slice(0, -1);
        display.update(calc.currNum);
    }
}

function clrBtnHandler(event) {
    calc.resetState();
    display.clear();
}

function signBtnHandler(event) {
    display.update(calc.currNum *= -1);
}

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

const display = new Display(document.querySelector('.display'))
let precision = 11 // Digits
const calc = new Calculator(precision);