import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
  // return <div>언마운트 테스트</div>;

  useEffect(() => {
    console.log('마운트');
    return () => {
      console.log('언마운트');
    };
  }, []);

  return <div>언마운트 테스트</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>보이기/가리기</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
