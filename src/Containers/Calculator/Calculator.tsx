import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../app/store';
import {appendToExpression, calculateResult, refresh} from './CalculatorSlice';
import ErrorContainer from '../ErrorContainer/ErrorContainer';

interface calcState {
  expression: string;
  result: string;
  error: boolean;
}

const Calculator = () => {
  const dispatch: AppDispatch = useDispatch();
  const {expression, result, error}: calcState = useSelector((state: RootState) => state.calculator);

  const handleButtonClick = (value: string) => {
    switch (value) {
      case '=':
        dispatch(calculateResult(value));
        break;
      case 'C':
        dispatch(refresh(value));
        break;
      default:
        dispatch(appendToExpression(value));
    }
  };

  const renderDigits = () => {
    const digits = '1234567890';
    return digits.split('').map(digit => (
      <button key={digit} onClick={() => handleButtonClick(digit)}>
        {digit}
      </button>
    ));
  };

  const renderMathOperators = () => {
    const operators = ['+', '-', '*', '/', '=', 'C'];
    return operators.map((item, i) => (
      <button key={i} onClick={() => handleButtonClick(item)}>{item}</button>
    ));
  };

  return (
    <div className="calc-container">
      <div className="calc-display">
        <p className="expression">{expression}</p>
        <p className="result">{result}</p>
        {error && <ErrorContainer/>}
      </div>
      <div className="calc-buttons">
        {renderDigits()}
        {renderMathOperators()}
      </div>
    </div>
  );
};

export default Calculator;