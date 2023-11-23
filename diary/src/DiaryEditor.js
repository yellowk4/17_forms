import React, { useState, useRef } from 'react';

const DiaryEditor = ({ onCreate }) => {
  // const [author, setAuthor] = useState('');
  // const [content, setContent] = useState('');

  // 하나돌 합침
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });

  const authorInput = useRef();
  const contentInput = useRef();

  // 이벤트 함수 합침
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      // alert('작성자는 최소 1글자 이상 입력해주세요.');
      // focus
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      // alert('내용을 5자 이상 입력해주세요.');
      // focus
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert('저장되었습니다.');
    setState({
      author: '',
      content: '',
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          // onChange={(e) => {
          //   // setState({
          //   //   author: e.target.value,
          //   //   content: state.content,
          //   // });
          //   setState({
          //     ...state, // 기존 state를 풀어놓고
          //     author: e.target.value,
          //   });
          // }}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          // onChange={(e) => {
          //   // setState({
          //   //   author: state.author,
          //   //   content: e.target.value,
          //   // });
          //   setState({
          //     ...state,
          //     content: e.target.value,
          //   });
          // }}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <div>
        오늘의 감정점수: &nbsp;&nbsp;
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
