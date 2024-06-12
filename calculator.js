const Input = {
    isNumber: function(digit) {
        return ((digit >= 0 && digit <= 9) || digit === '.' || digit === '-')
    },
    isOperator: function(digit) {
        return (digit === '+' || digit === '-' || digit === '*' || digit === '/' || digit === '%')
    }
}

const Calc = {
    PRECISION: 100000000000,
    inputA: '',
    inputB: '',
    operator: '',
    result: '',

    reset: function() {
        this.inputA = '',
        this.inputB = '',
        this.operator = '';
        this.result = '';
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
    // Try to do this without a state machine. See if it reads better or worse.
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

