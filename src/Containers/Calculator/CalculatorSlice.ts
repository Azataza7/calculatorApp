import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface calcState {
  expression: string;
  result: string;
}

const initialState: calcState = {
  expression: '',
  result: '',
}

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    appendToExpression: (state, action: PayloadAction<string>) => {
      state.expression += action.payload;
    },
    calculateResult: state => {
      try {
        state.result = eval(state.expression);
      } catch (error) {
        state.result = 'Error';
        state.expression = '';
      }
    },
    refresh: state => {
      state.expression = '';
      state.result = '';
    },
  }
})

export const calculatorReducer = calculatorSlice.reducer
export const { appendToExpression, calculateResult, refresh } = calculatorSlice.actions;


