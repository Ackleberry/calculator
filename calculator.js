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

const Calc = {
    PRECISION: 100000000000,
    currNum: '',
    prevNum: '',
    operator: '',
    op_complete: false,

    clear: function() {
        this.currNum = '';
        this.prevNum = '';
        this.operator = '';
        this.op_complete = false;
    },
    isFull: function() {
        return Calc.prevNum !== '' && Calc.currNum !== '';
    },
    operate: function(op, a, b) {
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
    
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            res = Math.round(this.PRECISION * res) / this.PRECISION;
        }

        console.log(`A: ${a}, OP: ${op}, B: ${b}, RES: ${res}`);

        return res;
    }
}

function numBtnHandler(event) {
    let input = event.target.innerText;
    if ((input === '.' && Calc.currNum.includes('.')) 
        || Calc.currNum.length >= DISPLAY_CHAR_WIDTH) {
        return;
    }

    Calc.currNum = (Calc.op_complete) ? input : (Calc.currNum + input);
    display.innerText = Calc.currNum;
    Calc.op_complete = false;
}

function opBtnHandler(event) {
    let input = event.target.innerText;

    if (Calc.isFull()) {
        Calc.currNum = Calc.operate(Calc.operator, Calc.prevNum, Calc.currNum);
        display.innerText = updateDisplay(Calc.currNum);
        Calc.op_complete = true;
    }
    
    Calc.prevNum = Calc.currNum;
    Calc.currNum = '';
    Calc.operator = input;
}

function eqlBtnHandler(event) {
    if (Calc.prevNum !== '' && Calc.currNum !== '') {
        Calc.currNum = Calc.operate(Calc.operator, Calc.prevNum, Calc.currNum);
        display.innerText = updateDisplay(Calc.currNum);
        Calc.op_complete = true;
        Calc.prevNum = '';
    }
}

function delBtnHandler(event) {
    if (Calc.op_complete === false) {
        Calc.currNum = Calc.currNum.slice(0, -1);
        display.innerText = Calc.currNum;
    }
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

