// FIXME: We have to '-' signs on the calculator!

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
    operator: '',

    reset: function() {
        this.currNum = '',
        this.prevNum = '',
        this.operator = '';
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

function calcHandler(input) {
    if (input === '.' && Calc.currNum.includes('.')) {
        return;
    }

    if (isNumber(input)) {
        Calc.currNum += input;
        display.innerText = Calc.currNum;
    } else if (isOperator(input)) {
        if (Calc.prevNum !== '' && Calc.currNum !== '') {
            Calc.currNum = Calc.operate(Calc.operator, Calc.prevNum, Calc.currNum);
            display.innerText = Calc.currNum;
        }
        
        Calc.prevNum = Calc.currNum;
        Calc.operator = input;
        Calc.currNum = '';
    } else if (input === '=') {
        Calc.currNum = Calc.operate(Calc.operator, Calc.prevNum, Calc.currNum);
        display.innerText = Calc.currNum;
        Calc.prevNum = '';
    }
}

function interfaceInput(event) {
    calcHandler(event.target.innerText);
}

function keyboardInput(event) {
    let key = event.key;
    
    if (Calc.isNumber(key) || Calc.isOperator(key)) {
        calcHandler(key);
    } else if (key === 'Enter') {
        key = '=';
        calcHandler(key);
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', interfaceInput);
})

document.addEventListener('keypress', keyboardInput);
let display = document.querySelector('.display');
Calc.reset()

