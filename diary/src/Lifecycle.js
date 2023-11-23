import React, { useEffect, useState } from 'react';

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('마운트');
  }, []);

  useEffect(() => {
    console.log('Update');
  });

  useEffect(() => {
    console.log(`count Update : ${count}`);
    if (count > 5) {
      alert('5보다 큽니다. 1로 초기화 합니다.');
      setCount(1);
    }
  }, [count]);

  useEffect(() => {
    console.log(`text Update : ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>증가</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
