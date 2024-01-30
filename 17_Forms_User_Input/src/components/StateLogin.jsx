import React, { useState } from 'react';

export default function Login() {
  // 여러개의 state를 관리하는 방법
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    console.log('form.email: ' + form.email);
    console.log('form.password: ' + form.password);
  }

  function handleInputChange(identifier, event) {
    setForm((prevValues) => ({
      ...prevValues,
      [identifier]: event.target.value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => {
              handleInputChange('email', event);
            }}
            value={form.email}
          />
        </div>

        <div className="control no-margin">
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
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
