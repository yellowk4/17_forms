import { useSelector, useDispatch } from 'react-redux'; //react-redux팀이 제공하는 useSelector 함수를 사용하여 상태를 가져올 수 있습니다. useStore도 사용 가능

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch(); //useDispatch 함수를 사용하여 액션을 보낼 수 있습니다. 이 함수는 리덕스 스토어의 dispatch 메서드를 반환합니다.
  const counter = useSelector((state) => state.counter); //useSelector 함수를 사용하여 상태를 가져올 수 있습니다. 이 함수는 리덕스 스토어의 상태를 가져오는 데 사용됩니다.
  const show = useSelector((state) => state.showCounter);

  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 5 });
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
