let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression === '' || /[+\-*/.]\ s*$/.test(expression)) {
        return;
    }
    
    // Handle decimal point
    if (op === '.') {
        // Get the last number
        let lastNumber = expression.split(/[+\-*/]/).pop();
        // Prevent multiple decimal points in the same number
        if (lastNumber.includes('.')) {
            return;
        }
    }
    
    expression += op;
    updateDisplay();
}

function calculate() {
    if (expression === '') {
        return;
    }

    try {
        // Replace × and − with * and - for JavaScript evaluation
        let result = eval(expression.replace(/×/g, '*').replace(/−/g, '-'));
        expression = String(result);
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === '.') {
        appendOperator('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();