import React, { useState, useEffect } from 'react';

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update: ${count}`);
  });
  return <div>{count}</div>;
});

// 객체를 비교할 때는 얕은 비교를 한다 => areEqual
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  // if (prevProps.obj.count === nextProps.obj.count) {
  //   return true;
  // }
  // return false; // 다르면 리렌더링
  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A 버튼</button>
      </div>
      <div>
        <h2>counter B</h2>
        {/* <CounterB obj={obj} /> */}
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B 버튼</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
