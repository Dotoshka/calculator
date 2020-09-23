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
let currentOperation = undefined;
updateDisplay();

/* Event listeners */

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

deleteButton.addEventListener('click', deleteLast);

allClearButton.addEventListener('click', button => {
    clearAll();
    updateDisplay();
});

equalsButton.addEventListener('click', button => {
    compute();
    updateDisplay();
});

/* Functions  */

function appendNumber(number) {

    if (number === '.' && currentOperand.indexOf('.') !== -1) {
        return currentOperand
    } else if (currentOperand === '0' && number !== '.') {
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
    updateDisplay();

}

function clearAll() {
    previousOperand = '';
    currentOperand = '0';
    currentOperation = undefined;
}

function compute() {
    let computation = 0;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (!isNaN(prev) || !isNaN(curr)) {
        switch (currentOperation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                computation = prev * curr;
                break;
            case '*':
                computation = prev / curr;
                break;
            default:
                return;
        }
    }

    currentOperand = computation;
    currentOperation = undefined;
    previousOperand = '';
}

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    if (currentOperation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${currentOperation}`;
    } else {
        previousOperandTextElement.innerText = previousOperand;
    }

}

