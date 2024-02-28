// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

// Redux Toolkit을 사용하면, createSlice 함수를 사용하여 리듀서와 액션을 한 번에 정의할 수 있습니다.
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// toolit 이전 코드
// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'increment') {
//     // Redux로 작업할 때는 절대 state를 변형해서는 안 됩니다. state를 복사한 후, 그 복사본을 수정해야 합니다.
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'increase') {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === 'toggle') {
//     return {
//       showCounter: !state.showCounter,
//       counter: state.counter,
//     };
//   }

//   return state;
// };

// const store = createStore(counterReducer); // createStore에는 포인터가 들어가야 함, 리듀서 함수를 포인트 합니다.
// createStore 취소선 관련해서는 https://redux.js.org/api/createstore 참고
// Redux Toolkit이라는 라이브러리가 소개되면서, 이 라이브러리의 configureStore 함수로 대체 가능
// const store = createStore(counterSlice.reducer);

const initialAuthState = {
  isAuthenticated: false,
};

// authSlice 추가
const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  // reducer: counterSlice.reducer, // key 값 대신에 객체를 설정해서 넣게 되면, 여러 개의 리듀서를 사용할 수 있습니다. {counter: counterSlice.reducer, auth: authSlice.reducer}
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
