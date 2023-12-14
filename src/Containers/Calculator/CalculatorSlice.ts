import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface calcState {
  expression: string;
  result: string;
  error: boolean;
}

const initialState: calcState = {
  expression: '',
  result: '',
  error: false
};

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
      } catch (e) {
        console.log(e);
        state.error = true;
      }
    },
    refresh: state => {
      state.expression = '';
      state.result = '';
      state.error = false;
    },
  }
});

export const calculatorReducer = calculatorSlice.reducer;
export const {appendToExpression, calculateResult, refresh} = calculatorSlice.actions;


