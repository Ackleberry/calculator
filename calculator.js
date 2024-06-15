const DISPLAY_CHAR_WIDTH = 16;

function isNumber(digit) {
    return (Number.isInteger(+digit) || digit === '.')
}

function isOperator(digit) {
    return (digit === '+' || digit === '-' || digit === '*' || digit === '/' || digit === '%')
}

const Calc = {
    PRECISION: 100000000000,
    currNum: '',
    prevNum: '',
    result: '',
    operator: '',

    clear: function() {
        this.currNum = '';
        this.prevNum = '';
        this.operator = '';
    },
    isEmpty: function() {
        return Calc.prevNum === '' && Calc.currNum === '';
    },
    isFull: function() {
        return Calc.prevNum !== '' && Calc.currNum !== '';
    },
    operate: function(op, a, b) {
        a = Number(a);
        b = Number(b);

        console.log(`OP: ${op}, A: ${a}, B: ${b}`);
        
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
    
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            res = Math.round(this.PRECISION * res) / this.PRECISION;
        }

        return res;
    }
}

function numBtnHandler(event) {
    let input = event.target.innerText;
    if ((input === '.' && Calc.currNum.includes('.')) 
        || Calc.currNum.length >= DISPLAY_CHAR_WIDTH) {
        return;
    }

    Calc.currNum += input;
    display.innerText = Calc.currNum;
}

function opBtnHandler(event) {
    let input = event.target.innerText;

    if (Calc.isEmpty() && Calc.result !== '') {
        Calc.currNum = Calc.result;
    } else if (Calc.isFull()) {
        Calc.result = Calc.operate(Calc.operator, Calc.prevNum, Calc.currNum);
        display.innerText = Calc.result;
        Calc.currNum = Calc.result;
    }
    
    Calc.prevNum = Calc.currNum;
    Calc.currNum = '';
    Calc.operator = input;
}

function eqlBtnHandler(event) {
    if (Calc.prevNum !== '' && Calc.currNum !== '') {
        Calc.result = Calc.operate(Calc.operator, Calc.prevNum, Calc.currNum);
        display.innerText = Calc.result;
        Calc.clear()
    }
}

function delBtnHandler(event) {
    Calc.currNum = Calc.currNum.slice(0, -1);
    display.innerText = Calc.currNum;
}

function clrBtnHandler(event) {
    Calc.clear();
    display.innerText = '';
}

function signBtnHandler(event) {
    Calc.currNum *= -1;
    display.innerText = Calc.currNum;
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

