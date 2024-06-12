const States = {
    STATE_FIRST_DIGIT: 0,
    STATE_FIRST_NUM: 1,
    STATE_SECOND_DIGIT: 2,
    STATE_SECOND_NUM: 3,
}

const calc = {
    PRECISION: 100000000000,
    state: States.STATE_FIRST_DIGIT,
    num1: '',
    num2: '',
    operator: '',
    result: '',

    reset: function() {
        this.state = States.STATE_FIRST_DIGIT;
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        this.result = '';
    },
    isOperator: function(op) {
        return (op === '+' || op === '-' || op === '*' || op === '/' || op === '%')
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

function btnHandler(event) {
    let btnValue = event.target.innerText;

    if (btnValue === 'CLR') {
        calc.reset();
        display.textContent = '';
    } else if (btnValue === 'DEL') {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        switch(calc.state) {
            case States.STATE_FIRST_DIGIT:
                if (!calc.isOperator(btnValue) && btnValue !== '=') {
                    display.textContent = btnValue;
                    calc.state = States.STATE_FIRST_NUM;
                } else if (btnValue === '=') {
                    display.textContent = 'ERROR';
                }
            break;
            case States.STATE_FIRST_NUM:
                if (calc.isOperator(btnValue)) {
                    calc.state = States.STATE_SECOND_DIGIT;
                    calc.operator = btnValue;
                    calc.num1 = display.textContent;
                } else if (btnValue === '=') {
                    display.textContent = 'ERROR';
                } else {
                    display.textContent += btnValue;
                }
            break;
            case States.STATE_SECOND_DIGIT:
                if (!calc.isOperator(btnValue) && btnValue !== '=') {
                    display.textContent = btnValue;
                    calc.state = States.STATE_SECOND_NUM;
                } else if (btnValue === '=') {
                    display.textContent = 'ERROR';
                }
            break;
            case States.STATE_SECOND_NUM:
                if (calc.isOperator(btnValue)) {
                    calc.num2 = display.textContent;
                    calc.result = calc.operate(calc.operator, calc.num1, calc.num2);
                    calc.operator = btnValue;
                    calc.num1 = calc.result;
                    display.textContent = calc.result;
                    calc.state = States.STATE_SECOND_DIGIT;
                } else if (btnValue === '=') {
                    calc.num2 = display.textContent;
                    calc.result = calc.operate(calc.operator, calc.num1, calc.num2);
                    display.textContent = calc.result;
                    calc.state = States.STATE_FIRST_DIGIT;
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

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', btnHandler);
})

let display = document.querySelector('.display');
display.textContent = "";

