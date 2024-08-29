export const ADD_DIGIT = 'ADD_DIGIT';
export const ADD_OPERATOR = 'ADD_OPERATOR';
export const CLEAR = 'CLEAR';
export const CALCULATE = 'CALCULATE';

export const addDigit = (digit) => ({ type: ADD_DIGIT, payload: digit });
export const addOperator = (operator) => ({ type: ADD_OPERATOR, payload: operator });
export const clear = () => ({ type: CLEAR });
export const calculate = () => ({ type: CALCULATE });
