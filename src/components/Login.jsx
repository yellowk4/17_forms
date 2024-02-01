import React, { useRef, useState } from 'react';

export default function Login() {
  const [emailIsValid, setEmailIsValid] = useState(false); // 기본값은 유효성 검사 안함

  // ref를 사용하는 방법이 state를 사용하는 방법보다 코드가 더 간결하다.
  // 단점 : 복잡한 양식에서는 많은 참조를 사용해야 하므로 코드가 더 복잡해질 수 있다.참조를 하나씩 연결해야 한다.
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);

    // // 초기화
    // // reset the form => DOM을 업데이트 하는 것이기 때문에 추천하지 않음
    // email.current.value = '';
    // password.current.value = '';
    // // 추천!
    // event.target.reset();

    const emailsValid = enteredEmail.includes('@');

    if (!emailsValid) {
      // 이메일 주소에 '@' 문자가 포함되지 않았을 때 setEmailIsValid(true)가 호출되어 emailIsValid 상태가 true로 설정됩니다.
      setEmailIsValid(true);
      return; // 유효하지 않은 데이터가 들어오면 함수를 종료
    }

    // 유효하지 않은 데이터가 들어오면 아래 코드는 실행되지 않는다.
    setEmailIsValid(false);
    console.log('Sending HTTP request...');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">{emailIsValid && <p>Please enter a valid email!</p>}</div>
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
