// import React, { useState } from 'react';
import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { useInput } from '../hooks/useInput';

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    // } = useInput('', isEmail);
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6));

  // 아래 커스텀 훅 사용으로 제거
  // // 여러개의 state를 관리하는 방법
  // // 하나의 입력 양식마다 유효성 검증을 할 때 state를 사용하는 것이 좋다.
  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  // });

  // // 사용자가 다시 타이핑을 했을 때에 해당 포커스 상태를 리셋
  // const [didEdit, setDidEdit] = useState({
  //   email: false,
  //   password: false,
  // });

  // const emailIsValid = form.email !== '' && !form.email.includes('@'); // @가 없으면 true
  //const emailIsValid = didEdit.email && !form.email.includes('@'); // 먼저 포커스가 인입되어 true가 되어야 함 그리고 @가 없으면 true => 둘다 true가 되면 알림 나옴

  // console.log('didEdit.email: ' + didEdit.email);
  // console.log('!isEmail(form.email): ' + !isEmail(form.email));
  // console.log('!isNotEmpty(form.email): ' + !isNotEmpty(form.email));

  // 이메일 유효성 검사
  // const emailIsValid = didEdit.email && !isEmail(form.email) && !isNotEmpty(form.email);
  // console.log('emailIsValid: ' + emailIsValid);

  // emailIsValid false이면 알림 안 뜨고 유효성 통과
  //const passwordIsValid = didEdit.password && form.password.trim().length < 6; // 먼저 포커스가 인입되어 true가 되어야 함 그리고 비밀번호가 6자리 이상이면 true => 둘다 true가 되면 알림 나옴
  //trim() 메서드는 문자열 양 끝의 공백을 제거하고 원본 문자열을 수정하지 않고 새로운 문자열을 반환합니다.
  // const passwordIsValid = didEdit.password && !hasMinLength(form.password, 6);

  function handleSubmit(e) {
    e.preventDefault();

    // submit 버튼을 누를 때 유효성 검사를 한다.
    // const submitEmailIsValid = form.email.includes('@');

    // if (emailIsValid) {
    //   console.log('제대로 입력 하지 않음');

    //   setForm({
    //     email: '',
    //     password: '',
    //   });
    //   return; // 유효하지 않은 데이터가 들어오면 함수를 종료
    // }

    // 유효하지 않은 데이터가 들어오면 아래 코드는 실행되지 않는다. => 제대로 입력을 했을 때만 실행

    // console.log('Sending HTTP request...');
    console.log('form.email: ' + form.email);
    console.log('form.password: ' + form.password);

    // setDidEdit(true);

    // setForm({
    //   email: '',
    //   password: '',
    // });
  }

  // 유효성 검증
  // 1. 키 입력에 따른 검증
  // 2. 포커싱 해제에 따른 검증
  // 3. 사용자가 다시 타이핑을 했을 때에 검증
  // 4. submit 버튼을 누를 때 검증

  // 아래 커스텀 훅 사용으로 제거
  // function handleInputChange(identifier, event) {
  //   setForm((prevValues) => ({
  //     ...prevValues,
  //     [identifier]: event,
  //   }));
  //   setDidEdit((prevEdit) => ({
  //     // 사용자가 다시 타이핑을 했을 때에 해당 포커스 상태를 리셋
  //     ...prevEdit,
  //     [identifier]: false,
  //   }));
  // }

  // function handleInputBlur(identifier) {
  //   setDidEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [identifier]: true,
  //   }));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailIsValid && 'Please enter a valid email!'}
        />
        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => {
              handleInputBlur('email');
            }}
            onChange={(event) => {
              handleInputChange('email', event);
            }}
            value={form.email}
          />
          <div className="control-error">
            {emailIsValid && <p>이메일 형식이 올바르지 않습니다.</p>}
          </div>
        </div> */}

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={(event) => handleInputChange('password', event.target.value)}
          value={form.password}
          error={passwordIsValid && 'Please enter a valid password!'}
        />

        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => {
              handleInputChange('password', event);
            }}
            value={form.password}
          />
        </div> */}
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" disabled={!form.email && !form.password}>
          Login
        </button>
      </p>
    </form>
  );
}
