/* Variables */

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const inlineOperationButtons = document.querySelectorAll('[data-inline-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const signButton = document.querySelector('[data-sign]');

let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');

let previousOperand = '';
let currentOperand = '0';
let currentOperation = '';
let Computed = false;

updateDisplay();

/* Event listeners button click */

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === 'x^y') {
            chooseOperation('^');
        } else {
            chooseOperation(button.innerText);
        }
        updateDisplay();
    });
})

inlineOperationButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (button.innerText === 'x!') {
            computeInline('!');
        } else {
            computeInline(button.innerText);
        }

        updateDisplay();
    });
})

deleteButton.addEventListener('click', button => {
    deleteLast();
    updateDisplay();
});

allClearButton.addEventListener('click', button => {
    clearAll();
    updateDisplay();
});

equalsButton.addEventListener('click', button => {
    compute();
    updateDisplay();
});

signButton.addEventListener('click', button => {
    changeSign();
    updateDisplay();
});

/* Event listener keypress */

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    numberButtons.forEach(button => {
        if (button.innerText === keyName) {
            appendNumber(button.innerText);
            updateDisplay();
        }
    })
    operationButtons.forEach(button => {
        if (button.innerText === keyName) {
            chooseOperation(button.innerText);
            updateDisplay();
        }
    })

    if (keyName === 'Backspace') {
        deleteLast();
        updateDisplay();
    }

    if (keyName === 'Enter') {
        event.preventDefault();
        compute();
        updateDisplay();
    }

    if (keyName === '=') {
        compute();
        updateDisplay();
    }

    if (keyName === 'Escape') {
        clearAll();
        updateDisplay();
    }

    if (keyName === '^') {
        chooseOperation(keyName);
        updateDisplay();
    }

    if (keyName === '–') {
        changeSign();
        updateDisplay();
    }

    if (keyName === '%' || keyName === '!') {
        computeInline(keyName);
        updateDisplay();
    }

});

/* Functions  */

function appendNumber(number) {

    let decimalLength = 0;

    if (typeof currentOperand !== 'number' && currentOperand.includes('.')) {
        decimalLength = currentOperand.split('.')[1].length;
        if (decimalLength > 7) {
            return currentOperand;
        }
    }

    if (number === '.' && Computed === false && currentOperand.includes('.')) {
        return currentOperand;
    } else if (currentOperand === '0' && number !== '.' || Computed === true) {
        currentOperand = number;
        Computed = false;
    } else {
        currentOperand += number;
        Computed = false;
    }

    if (currentOperand[0] === '.') {
        currentOperand = `0${currentOperand}`
    }
}

function changeSign() {

    if (currentOperand === "Undefined") {
        return currentOperand
    }

    if (currentOperand === '' || currentOperand === '0' ||
        currentOperand === 0) {
        return currentOperand;
    }

    curr = parseFloat(currentOperand);
    curr = curr - (curr * 2);
    currentOperand = curr;
}

function chooseOperation(operation) {

    if (currentOperand === "Undefined") {
        return currentOperand
    }

    if (previousOperand !== '' && currentOperand !== '') {
        compute();
        Computed = false;
    }

    if (currentOperand !== '') {
        previousOperand = currentOperand;
        currentOperand = '';
    }

    currentOperation = operation;
}

function compute() {

    let computation = 0;
    const prev = parseFloat(previousOperand);
    let curr = parseFloat(currentOperand);
    if (isNaN(prev)) {
        return computation;
    } else {

        if (isNaN(curr)) {
            curr = prev;
        }

        switch (currentOperation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '^':
                computation = Math.pow(prev, curr);
                break;
            default:
                return;
        }
    }

    currentOperand = parseFloat(computation.toFixed(8));
    currentOperation = '';
    previousOperand = '';
    Computed = true;
}


function computeInline(operation) {
    let computation = 0;
    const curr = parseFloat(currentOperand);
    if (isNaN(curr)) {
        return computation;
    } else {
        switch (operation) {
            case '%':
                if (currentOperation == '+' || currentOperation == '-') {
                    computation = curr * 0.01 * previousOperand;
                } else {
                    computation = curr * 0.01;
                }
                break;
            case '+/-':
                computation = curr - 2 * curr;
                break;
            case 'x^2':
                computation = Math.pow(curr, 2);
                break;
            case '√x':
                computation = Math.sqrt(curr);
                break;
            case '!':
                computation = factorial(curr);
                break;
            default:
                return;
        }
    }

    if (isNaN(computation)) {
        currentOperand = 'Undefined'
    } else {
        currentOperand = parseFloat(computation.toFixed(8));
    }
    Computed = true;
}


function deleteLast() {

    if (currentOperand === 'Undefined') {
        return currentOperand;
    }

    if (Computed) {
        return currentOperand;
    } else if (currentOperand !== '0') {
        currentOperand = currentOperand.slice(0, -1);
        if (currentOperand === '') {
            currentOperand = '0';
        }
    }
}

function clearAll() {
    previousOperand = '';
    currentOperand = '0';
    currentOperation = '';
    Computed = false;
}


function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    if (currentOperation != '') {
        previousOperandTextElement.innerText = `${previousOperand} ${currentOperation}`;
    } else {
        previousOperandTextElement.innerText = previousOperand;
    }

}

function factorial(n) {
    result = 1;
    if (n < 0) {
        result = NaN;
    }
    if (n === 0) {
        return result;
    } else {
        for (i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}