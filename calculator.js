const States = {
    STATE_FIRST_NUM_DIGIT: 0,
    STATE_FIRST_NUM: 1,
    STATE_SECOND_NUM_DIGIT: 2,
    STATE_SECOND_NUM: 3,
}

const Calc = {
    PRECISION: 100000000000,
    state: States.STATE_FIRST_NUM_DIGIT,
    num1: '',
    num2: '',
    operator: '',
    result: '',

    reset: function() {
        this.state = States.STATE_FIRST_NUM_DIGIT;
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
    let btnValue = input;

    if (btnValue === 'CLR') {
        Calc.reset();
        display.textContent = '';
    } else if (btnValue === 'DEL') {
        if (Calc.state !== States.STATE_FIRST_NUM_DIGIT) {
            display.textContent = display.textContent.slice(0, -1);
        }
    } else {
        switch(Calc.state) {
            case States.STATE_FIRST_NUM_DIGIT:
                if (Calc.isOperator(btnValue) && Calc.num1 !== '') {
                    Calc.operator = btnValue;
                    Calc.state = States.STATE_SECOND_NUM_DIGIT;
                } else if (!Calc.isOperator(btnValue) && btnValue !== '=') {
                    display.textContent = btnValue;
                    Calc.state = States.STATE_FIRST_NUM;
                }
            break;
            case States.STATE_FIRST_NUM:
                if (Calc.isOperator(btnValue)) {
                    Calc.state = States.STATE_SECOND_NUM_DIGIT;
                    Calc.operator = btnValue;
                    Calc.num1 = display.textContent;
                } else if (btnValue === '=') {
                    display.textContent = 'ERROR';
                    Calc.state = States.STATE_FIRST_NUM_DIGIT;
                } else if (btnValue === '.' && display.textContent.includes('.')) {
                    // Ignore extra '.'
                } else {
                    display.textContent += btnValue;
                }
            break;
            case States.STATE_SECOND_NUM_DIGIT:
                if (!Calc.isOperator(btnValue) && btnValue !== '=') {
                    display.textContent = btnValue;
                    Calc.state = States.STATE_SECOND_NUM;
                } else if (btnValue === '=') {
                    display.textContent = 'ERROR';
                    Calc.state = States.STATE_FIRST_NUM_DIGIT;
                }
            break;
            case States.STATE_SECOND_NUM:
                if (Calc.isOperator(btnValue)) {
                    Calc.num2 = display.textContent;
                    Calc.result = Calc.operate(Calc.operator, Calc.num1, Calc.num2);
                    Calc.operator = btnValue;
                    Calc.num1 = Calc.result;
                    display.textContent = isFinite(Calc.result) ? Calc.result : "ERROR";;
                    Calc.state = States.STATE_SECOND_NUM_DIGIT;
                } else if (btnValue === '=') {
                    Calc.num2 = display.textContent;
                    Calc.result = Calc.operate(Calc.operator, Calc.num1, Calc.num2);
                    display.textContent = isFinite(Calc.result) ? Calc.result : "ERROR";
                    Calc.state = States.STATE_FIRST_NUM_DIGIT;
                    Calc.reset();
                    Calc.num1 = display.textContent;
                } else if (btnValue === '.' && display.textContent.includes('.')) {
                    // Ignore extra '.'
                } else {
                    display.textContent += btnValue;
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

