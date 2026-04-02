// 1. DECLARE VARIABLES (State Management)
let firstNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

// 2. SELECT ELEMENTS FROM HTML
const display = document.getElementById('display-screen');
const numberButtons = document.querySelectorAll('.number-btn');
const operationButtons = document.querySelectorAll('.operation-btn');
const equalsButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector('.clear');
const ceButton = document.querySelector('.ce-btn');
const delButton = document.querySelector('.del-btn');
const percentButton = document.querySelector('.percent-btn');

// 3. ADD EVENT LISTENERS

// Number Buttons - Handle number clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Reset display if an operation was just clicked
        if (shouldResetDisplay) {
            display.value = '';
            shouldResetDisplay = false;
        }

        // Get the number and append to display
        const number = button.textContent;
        display.value += number;
    });
});

// Operation Buttons - Handle +, -, *, /
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Store the first number
        firstNumber = display.value;

        // Store which operation was clicked
        currentOperator = button.textContent;

        // Set flag to reset display on next number click
        shouldResetDisplay = true;
    });
});

// Decimal Button - Prevent multiple dots
document.querySelector('.decimal-btn').addEventListener('click', () => {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
});

// Equals Button - Calculate result
equalsButton.addEventListener('click', () => {
    // Safety check - make sure we have both numbers and an operation
    if (currentOperator === null || firstNumber === null) {
        return;
    }

    // Get the second number from display
    const secondNumber = display.value;
    let result;

    // Convert strings to numbers
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    // Perform calculation based on operator
    if (currentOperator === '+') {
        result = num1 + num2;
    } else if (currentOperator === '-') {
        result = num1 - num2;
    } else if (currentOperator === '*') {
        result = num1 * num2;
    } else if (currentOperator === '/') {
        // Handle division by zero
        if (num2 === 0) {
            display.value = 'Error';
            return;
        }
        result = num1 / num2;
    }

    // Show result on display
    display.value = result;

    // Allow chaining calculations after equals
    shouldResetDisplay = true;

    // Reset for next calculation
    firstNumber = null;
    currentOperator = null;
});

// Clear Button - Reset everything
clearButton.addEventListener('click', () => {
    display.value = '';
    firstNumber = null;
    currentOperator = null;
    shouldResetDisplay = false;
});

// CE Button
ceButton.addEventListener('click', () => {
    display.value = '';
});

// DEL Button
delButton.addEventListener('click', () => {
    let currentValue = display.value;
    display.value = currentValue.slice(0, -1);
});

// % Button
percentButton.addEventListener('click', () => {
    let currentValue = parseFloat(display.value);

    if (isNaN(currentValue)) {
        return;
    }

    let percentage = currentValue / 100;
    display.value = percentage;
});