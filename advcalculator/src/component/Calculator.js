import React, { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [memory, setMemory] = useState(0);
  const [radians, setRadians] = useState(true); // Default to radians
  const [theme, setTheme] = useState('dark'); // Default theme is light
  const [history, setHistory] = useState([]); // Store calculation history

  const handleInput = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      // Evaluate the expression using eval
      const res = eval(input.replace('×', '*').replace('÷', '/'));
      setResult(res);
      setInput(res.toString());

      // Add to history
      setHistory([...history, `${input} = ${res}`]);

      // Check for special condition (operations involving 5 and 6)
      if (/\b5\b.*\b6\b|\b6\b.*\b5\b/.test(input)) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000); // Show confetti for 3 seconds
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(input || result));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(input || result));
  };

  const handleMemoryRecall = () => {
    setInput(memory.toString());
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const toggleRadians = () => {
    setRadians(!radians);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleScientificFunction = (func) => {
    let value = parseFloat(input || result);
    if (isNaN(value)) return;

    if (!radians && ['sin', 'cos', 'tan'].includes(func)) {
      value = (value * Math.PI) / 180; // Convert to radians if necessary
    }

    let res;
    switch (func) {
      case 'sin':
        res = Math.sin(value);
        break;
      case 'cos':
        res = Math.cos(value);
        break;
      case 'tan':
        res = Math.tan(value);
        break;
      case 'ln':
        res = Math.log(value);
        break;
      case 'log10':
        res = Math.log10(value);
        break;
      case 'sqrt':
        res = Math.sqrt(value);
        break;
      case 'factorial':
        res = factorial(value);
        break;
      // Add other cases for other scientific functions
      default:
        res = value;
    }

    setResult(res);
    setInput(res.toString());
  };

  const factorial = (n) => {
    if (n < 0) return undefined;
    if (n === 0) return 1;
    let result = 1;
    for (let i = n; i > 1; i--) {
      result *= i;
    }
    return result;
  };

  return (
    <div className={`calculator ${theme}`}>
      {confetti && <ConfettiExplosion />}
      <div className="display">
        <div className="result">{result}</div>
        <div className="input">{input}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        <button onClick={() => handleInput('(')}>(</button>
        <button onClick={() => handleInput(')')}>)</button>
        <button onClick={() => handleInput('÷')}>÷</button>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('×')}>×</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('+')}>+</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleScientificFunction('sin')}>sin</button>
        <button onClick={() => handleScientificFunction('cos')}>cos</button>
        <button onClick={() => handleScientificFunction('tan')}>tan</button>
        <button onClick={() => handleScientificFunction('ln')}>ln</button>
        <button onClick={() => handleScientificFunction('log10')}>log10</button>
        <button onClick={() => handleScientificFunction('sqrt')}>√</button>
        <button onClick={() => handleScientificFunction('factorial')}>!</button>
        <button onClick={toggleRadians}>{radians ? 'Rad' : 'Deg'}</button>
        <button onClick={handleMemoryAdd}>M+</button>
        <button onClick={handleMemorySubtract}>M-</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryClear}>MC</button>
        <button onClick={toggleTheme}>Theme</button>
      </div>
      <div className={`history ${theme}` }>
        <h3>History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
