const States = {
    STATE_FIRST_NUM_START: 0,
    STATE_FIRST_NUM: 1,
    STATE_SECOND_NUM_START: 2,
    STATE_SECOND_NUM: 3,
}

const Calc = {
    PRECISION: 100000000000,
    state: States.STATE_FIRST_NUM_START,
    num1: '',
    num2: '',
    operator: '',
    result: '',

    reset: function() {
        this.state = States.STATE_FIRST_NUM_START;
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        this.result = '';
    },
    isNumber: function(digit) {
        return ((digit >= 0 && digit <= 9) || digit === '.' || digit === '-')
    },
    isOperator: function(digit) {
        return (digit === '+' || digit === '-' || digit === '*' || digit === '/' || digit === '%')
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
    if (input === 'CLR') {
        Calc.reset();
        display.textContent = '';
    } else if (input === 'DEL') {
        if (Calc.state !== States.STATE_FIRST_NUM_START) {
            display.textContent = display.textContent.slice(0, -1);
        }
    } else {
        switch(Calc.state) {
            case States.STATE_FIRST_NUM_START:
                if (Calc.isOperator(input) && Calc.num1 !== '') {
                    Calc.operator = input;
                    Calc.state = States.STATE_SECOND_NUM_START;
                } else if (!Calc.isOperator(input) && input !== '=') {
                    display.textContent = input;
                    Calc.state = States.STATE_FIRST_NUM;
                }
            break;
            case States.STATE_FIRST_NUM:
                if (Calc.isOperator(input)) {
                    Calc.state = States.STATE_SECOND_NUM_START;
                    Calc.operator = input;
                    Calc.num1 = display.textContent;
                } else if (input === '=') {
                    display.textContent = 'ERROR';
                    Calc.state = States.STATE_FIRST_NUM_START;
                } else if (input === '.' && display.textContent.includes('.')) {
                    // Ignore extra '.'
                } else {
                    display.textContent += input;
                }
            break;
            case States.STATE_SECOND_NUM_START:
                if (!Calc.isOperator(input) && input !== '=') {
                    display.textContent = input;
                    Calc.state = States.STATE_SECOND_NUM;
                } else if (input === '=') {
                    display.textContent = 'ERROR';
                    Calc.state = States.STATE_FIRST_NUM_START;
                }
            break;
            case States.STATE_SECOND_NUM:
                if (Calc.isOperator(input)) {
                    Calc.num2 = display.textContent;
                    Calc.result = Calc.operate(Calc.operator, Calc.num1, Calc.num2);
                    Calc.operator = input;
                    Calc.num1 = Calc.result;
                    display.textContent = isFinite(Calc.result) ? Calc.result : "ERROR";
                    Calc.state = States.STATE_SECOND_NUM_START;
                } else if (input === '=') {
                    Calc.num2 = display.textContent;
                    Calc.result = Calc.operate(Calc.operator, Calc.num1, Calc.num2);
                    display.textContent = isFinite(Calc.result) ? Calc.result : "ERROR";
                    Calc.state = States.STATE_FIRST_NUM_START;
                    Calc.reset();
                    Calc.num1 = display.textContent;
                } else if (input === '.' && display.textContent.includes('.')) {
                    // Ignore extra '.'
                } else {
                    display.textContent += input;
                }
            break;
            default:
                console.log("ERROR: Unknown calculator state!");
            break;
        }
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

