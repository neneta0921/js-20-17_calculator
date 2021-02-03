class Calculate {
  constructor() {
    this._firstValue = 0;
    this._operatorValue = '';
    this._awaitingNextValue = false;
    this._calculatorDisplay = document.querySelector('h1');
    this._init();
  }

  _init() {
    this._addEvent();
  }

  _sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (this._awaitingNextValue) {
      this._calculatorDisplay.textContent = number;
      this._awaitingNextValue = false;
    } else {
      // If current display value is 0, replace it, if not add number
      const displayValue = this._calculatorDisplay.textContent;
      this._calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
  }

  _addDecimal() {
    // If operator pressed, don't add decimal
    if (this._awaitingNextValue) return;

    // If no decimal, add one
    if (!this._calculatorDisplay.textContent.includes('.')) {
      this._calculatorDisplay.textContent = `${this._calculatorDisplay.textContent}.`;
    }
  }

  _useOperator(operator) {
    // Calculate first and second values depending on operator
    const calculate = {
      '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
      '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
      '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
      '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
      '=': (firstNumber, secondNumber) => secondNumber,
    };

    const currentValue = Number(this._calculatorDisplay.textContent);

    // Prevent multiple operators
    if (this._operatorValue && this._awaitingNextValue) {
      this._operatorValue = operator;
      return;
    }

    // Assign firstValue if no value
    if (!this._firstValue) {
      this._firstValue = currentValue;
    } else {
      const calculation = calculate[this._operatorValue](this._firstValue, currentValue);
      this._calculatorDisplay.textContent = calculation;
      this._firstValue = calculation;
    }

    // Ready for next value, store operator
    this._awaitingNextValue = true;
    this._operatorValue = operator;
  }

  // Reset all values, display
  _resetAll() {
    this._firstValue = 0;
    this._operatorValue = '';
    this._awaitingNextValue = false;
    this._calculatorDisplay.textContent = '0';
  }

  _addEvent() {
    const inputBtns = document.querySelectorAll('button');
    const clearBtn = document.getElementById('clear-btn');

    // Add Event Listeners for numbers, operators, decimal buttons
    inputBtns.forEach((inputBtn) => {
      if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => this._sendNumberValue(inputBtn.value));
      } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => this._useOperator(inputBtn.value));
      } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => this._addDecimal());
      }
    });

    // Event Listener
    clearBtn.addEventListener('click', () => this._resetAll());
  }
}
