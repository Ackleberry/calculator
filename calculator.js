const States = {
    STATE_IDLE: 0,
    STATE_FIRST_NUM: 1,
    STATE_SECOND_NUM: 2,
}

const calc = {
    state: States.STATE_IDLE,
    num1: 0,
    num2: 0,
    operator: '+',
    result: 0,

    reset: function() {
        this.state = States.STATE_IDLE,
        this.num1 = 0,
        this.num2 = 0,
        this.operator = '+',
        this.result = 0
    },
    add: function(a, b) {
        return a + b;
    },
    sub: function(a, b) {
        return a - b;
    },
    mult: function(a, b) {
        return a * b;
    },
    div: function(a, b) {
        return a / b;
    },
    isOperator: function(op) {
        return (op === '+' || op === '-' || op === '*' || op === '/' || op === '%')
    },
    operate: function(operator, a, b) {
        let res;
        switch(operator) {
            case '+': 
                res = this.add(a, b);
            break;
            case '-':
                res = this.sub(a, b);
            break;
            case '*':
                res = this.mult(a, b);
            break;
            case '/':
                res = this.div(a, b);
            break;
            default:
                console.log("ERROR: Unknown operator.");
            break;
        }
    
        return res;
    }
}

function btnHandler(event) {
    let btnValue = event.target.innerText;

    switch(calc.state) {
        case States.STATE_IDLE:
            if (!calc.isOperator(btnValue)) {
                display.textContent = btnValue;
                calc.state = States.STATE_FIRST_NUM;
            }
        break;
        case States.STATE_FIRST_NUM:
            if (calc.isOperator(btnValue)) {
                calc.state = States.STATE_SECOND_NUM;
                calc.operator = btnValue;
                calc.num1 = Number(display.textContent);
                display.textContent = '';
            } else {
                display.textContent += btnValue;
            }
        break;
        case States.STATE_SECOND_NUM:
            if (btnValue === '=') {
                calc.state = States.STATE_EVAL;
                calc.num2 = Number(display.textContent);
                calc.result = calc.operate(calc.operator, calc.num1, calc.num2);
                display.textContent = calc.result;
                calc.state = States.STATE_IDLE;
            } else {
                display.textContent += btnValue;
            }
        break;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', btnHandler);
})

let display = document.querySelector('.display');
display.textContent = "";

