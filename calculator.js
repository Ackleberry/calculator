function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function operate(operator, a, b) {

    let res;

    switch(operator) {
        case '+': 
            res = add(a, b);
        break;
        case '-':
            res = sub(a, b);
        break;
        case '*':
            res = mult(a, b);
        break;
        case '/':
            res = div(a, b);
        break;
        default:
            console.log("ERROR: Unknown operator.");
        break;
    }

    return res;
}
