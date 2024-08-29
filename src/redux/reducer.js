import {
  ADD_DIGIT, ADD_OPERATOR, CLEAR, CALCULATE,
} from './actions';

import { evaluate } from 'mathjs';

const initialState = {
  display: '0',
  input: '',
  decimalUsed: false,
  trailingResult: '0',
  currentOperation: '',
};

const formatInput = (input) => input
  .replace(/ {2,}/g, ' ')
  .replace(/ {1}([+\-*/]) {1}/g,' $1 ')
  .replace(/--/g, '+')
  .replace(/(\d+)\s*([+\-*/])\s*$/g, '$1$2')
  .replace(/(\d+)\s*$/, '$1');

const processOperators = (input, operator) => {
  const operators = ['+', '-', '*', '/'];

  let modifiedInput = input;

  if (operators.includes(modifiedInput.slice(-1)) && modifiedInput.slice(-1) !== '-') {
    modifiedInput = modifiedInput.slice(0, -1);
  }

  if (modifiedInput === '' && operator === '-') {
    return modifiedInput + operator;
  }

  if (operators.includes(modifiedInput.slice(-1))) {
    modifiedInput = modifiedInput.slice(0, -1);
  }

  return modifiedInput + (modifiedInput === '' ? '' : ' ') + operator;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGIT: {
      const { payload } = action;
      if (payload === '.' && state.decimalUsed) {
        return state;
      }

      if (state.input === '0' && payload !== '.') {
        return {
          ...state,
          input: payload,
          display: payload,
          decimalUsed: payload === '.',
        };
      }

      const newInput = state.input + payload;
      return {
        ...state,
        input: newInput,
        display: newInput,
        decimalUsed: payload === '.' || state.decimalUsed,
      };
    }
    case ADD_OPERATOR: {
      const { payload } = action;
      const newInput = processOperators(state.input, payload);
      return {
        ...state,
        input: newInput,
        display: newInput,
        decimalUsed: false,
        currentOperation: payload,
      };
    }
    case CLEAR: {
      return {
        ...state,
        display: '0',
        input: '',
        decimalUsed: false,
        trailingResult: '0',
        currentOperation: '',
      };
    }

    case CALCULATE: {
      try {
        let formattedInput = state.input.trim();
        formattedInput = formatInput(formattedInput);
        const result = evaluate(formattedInput);
        const roundedResult = Math.round(result * 10000) / 10000;

        return {
          ...state,
          display: roundedResult.toString(),
          input: roundedResult.toString(),
          decimalUsed: roundedResult.toString().includes('.'),
          trailingResult: roundedResult.toString(),
          currentOperation: '',
        };
      } catch (e) {
        return {
          ...state,
          display: 'Error',
          input: '',
          decimalUsed: false,
          trailingResult: '0',
          currentOperation: '',
        };
      }
    }
    default:
      return state;
  }
};

export default reducer;
