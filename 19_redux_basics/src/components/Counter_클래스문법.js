import { useSelector, useDispatch, connect } from 'react-redux'; //react-redux팀이 제공하는 useSelector 함수를 사용하여 상태를 가져올 수 있습니다. useStore도 사용 가능

import classes from './Counter.module.css';

import { Component } from 'react';

// const Counter = () => {
//   const dispatch = useDispatch(); //useDispatch 함수를 사용하여 액션을 보낼 수 있습니다. 이 함수는 리덕스 스토어의 dispatch 메서드를 반환합니다.
//   const counter = useSelector((state) => state.counter); //useSelector 함수를 사용하여 상태를 가져올 수 있습니다. 이 함수는 리덕스 스토어의 상태를 가져오는 데 사용됩니다.

//   const incrementHandler = () => {
//     dispatch({ type: 'increment' });
//   };

//   const decrementHandler = () => {
//     dispatch({ type: 'decrement' });
//   };

//   const toggleCounterHandler = () => {};

//   return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{counter}</div>
//       <div>
//         <button onClick={incrementHandler}>Increment</button>
//         <button onClick={decrementHandler}>Decrement</button>
//       </div>
//       <button onClick={toggleCounterHandler}>Toggle Counter</button>
//     </main>
//   );
// };

// 클래스 컴포넌트로 변경
class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
