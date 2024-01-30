import React, { useRef, useState } from 'react';

export default function Login() {
  // ref를 사용하는 방법이 state를 사용하는 방법보다 코드가 더 간결하다.
  // 단점 : 복잡한 양식에서는 많은 참조를 사용해야 하므로 코드가 더 복잡해질 수 있다.참조를 하나씩 연결해야 한다.
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
