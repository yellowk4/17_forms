import { useState } from 'react';

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue); // validationFn은 useInput에 인수로 전달하는 함수입니다.

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid, // 입력이 만약 수정되어 didEdot이 true가 되고, valueIsValid가 false라면(해당 값이 유효하지 않다면) hasError는 true가 됩니다.
  };
}
