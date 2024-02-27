import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};

const store = createStore(counterReducer); // createStore에는 포인터가 들어가야 함, 리듀서 함수를 포인트 합니다.
// createStore 취소선 관련해서는 https://redux.js.org/api/createstore 참고
// Redux Toolkit이라는 라이브러리가 소개되면서, 이 라이브러리의 configureStore 함수로 대체 가능

export default store;
