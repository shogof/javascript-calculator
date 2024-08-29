import { useDispatch, useSelector } from 'react-redux';
import {
  addDigit, addOperator, clear, calculate
  } from './redux/actions';

const Calculator = () => {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.display);

  const handleButtonClick = (value) => {
    if (['+', '-', '*', '/'].includes(value)) {
      dispatch(addOperator(value));
    } else if (value === '=') {
      dispatch(calculate());
    } else if (value === 'C') {
      dispatch(clear());
    } else {
      dispatch(addDigit(value));
    }
  };

  const buttons = [
    { id: 'seven', value: '7' },
    { id: 'eight', value: '8' },
    { id: 'nine', value: '9' },
    { id: 'divide', value: '/' },
    { id: 'four', value: '4' },
    { id: 'five', value: '5' },
    { id: 'six', value: '6' },
    { id: 'multiply', value: '*' },
    { id: 'one', value: '1' },
    { id: 'two', value: '2' },
    { id: 'three', value: '3' },
    { id: 'subtract', value: '-' },
    { id: 'zero', value: '0' },
    { id: 'decimal', value: '.' },
    { id: 'equals', value: '=' },
    { id: 'add', value: '+' },
    { id: 'clear', value: 'C' },
  ];

  return (
    <div id='calculator'>
      <div id='display'>{display}</div>
      <div id='buttons'>
        {buttons.map((button) => (
          <button
            key={button.id}
            id={button.id}
            type='button'
            className={button.value === 'C' ? 'clear' : ''}
            onClick={() => handleButtonClick(button.value)}
          >
            {button.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
