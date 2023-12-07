import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../App';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

// 감정
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion1.png`,
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion2.png`,
    emotion_descript: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion3.png`,
    emotion_descript: '그럭저럭',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion4.png`,
    emotion_descript: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion/emotion5.png`,
    emotion_descript: '끔직함',
  },
];

// 날짜를 변환하는 함수
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const [emotion, setEmotion] = useState(3); // 기본값은 3
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigator = useNavigate();

  const contentRef = useRef();
  const [content, setContent] = useState(''); // 일기 내용

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content && content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '일기를 작성하시겠습니까?')) {
      if (!isEdit) {
        console.log('AA');
        onCreate(date, content, emotion); // 일기 내용을 저장
      } else {
        onEdit(originData.id, date, content, emotion); // 일기 내용을 수정
      }
    }
    navigator('/', { replace: true }); // 일기 목록으로 이동, replace: true는 뒤로가기를 눌렀을 때 이전 페이지로 돌아가지 않도록 하는 것
  };

  useEffect(() => {
    if (isEdit) {
      // setDate(getStringDate(new Date(parseInt(originData.date))));
      const timestamp = parseInt(originData.date);
      if (!isNaN(timestamp)) {
        setDate(getStringDate(new Date(timestamp)));
      }
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? '일기 수정하기' : '새 일기쓰기'}
        leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigator(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘은 어땠나요?"
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={'취소하기'} onClick={() => navigator(-1)} />
            <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
