import React from 'react';

export default function Input({ label, id, error, ...props }) {
  // props 사용, 구조분해 할당
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        // onBlur={() => {
        //   handleInputBlur('email');
        // }}
        // onChange={(event) => {
        //   handleInputChange('email', event);
        // }}
        // value={form.email}
      />
      <div className="control-error">{error && <p>{error}</p>}</div>
      {/* 조건부 체크 + 메시지 출력 */}
    </div>
  );
}
