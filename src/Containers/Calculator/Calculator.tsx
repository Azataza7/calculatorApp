import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../app/store';
import {appendToExpression, calculateResult, refresh} from './CalculatorSlice';

const Calculator = () => {
  const dispatch: AppDispatch = useDispatch();
  const {expression, result} = useSelector((state: RootState) => state.calculator);

  const handleButtonClick = (value: string) => {
    switch (value) {
      case '=':
        dispatch(calculateResult(value));
        break
      case 'C':
        dispatch(refresh(value));
        break
      default:
        dispatch(appendToExpression(value, expression));
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

  return (
    <div>
      <div>{expression}</div>
      <div>{result}</div>
      {renderDigits()}
      <button onClick={() => handleButtonClick('+')}>+</button>
      <button onClick={() => handleButtonClick('-')}>-</button>
      <button onClick={() => handleButtonClick('*')}>*</button>
      <button onClick={() => handleButtonClick('/')}>/</button>
      <button onClick={() => handleButtonClick('=')}>=</button>
      <button onClick={() => handleButtonClick('C')}>C</button>
    </div>
  );
};

export default Calculator;