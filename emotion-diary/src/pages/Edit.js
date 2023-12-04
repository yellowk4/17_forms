import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log('id: ', id);

  const mode = searchParams.get('mode');
  console.log('mode: ', mode);

  return (
    <div>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: 'winterlood' })}>QS 바꾸기</button>

      <button
        onClick={() => {
          navigate('/home');
        }}
      >
        Home 으로 가기
      </button>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
