/* Variables */

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');

let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');

let previousOperand = '';
let currentOperand = '0';
let currentOperation = '';
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
        chooseOperation(button.innerText);
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
    if (keyName === 'Enter' || keyName === '=') {
        compute();
        updateDisplay();
    }
    if (keyName === 'Escape') {
        clearAll();
        updateDisplay();
    }
});

/* Functions  */

function appendNumber(number) {

    if (number === '.' && currentOperand.indexOf('.') !== -1) {
        return currentOperand;
    } else if ((currentOperand === '0' && number !== '.') || currentOperand === 0) {
        currentOperand = number
    } else if (currentOperand === '' && number === '.') {
        currentOperand = `0${number}`
    } else {
        currentOperand += number;
    }

}

function chooseOperation(operation) {
    if (currentOperand === '') {
        return currentOperand
    }

    else if (previousOperand !== '') {
        compute();
    }

    currentOperation = operation;
    previousOperand = currentOperand;
    currentOperand = '';

}

function deleteLast() {

    if (currentOperand !== '0') {
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
}

function compute() {
    let computation = 0;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) {
        return computation;
    } else {
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
            default:
                return;
        }
    }

    currentOperand = computation;
    currentOperation = '';
    previousOperand = '';
}

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    if (currentOperation != '') {
        previousOperandTextElement.innerText = `${previousOperand} ${currentOperation}`;
    } else {
        previousOperandTextElement.innerText = previousOperand;
    }

}

