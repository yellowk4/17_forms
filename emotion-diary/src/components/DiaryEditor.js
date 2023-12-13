import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../App';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, originData }) => {
  const [emotion, setEmotion] = useState(3); // 기본값은 3
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigator = useNavigate();

  const contentRef = useRef();
  const [content, setContent] = useState(''); // 일기 내용

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content && content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '일기를 작성하시겠습니까?')) {
      if (!isEdit) {
        onCreate(date, content, emotion); // 일기 내용을 저장
      } else {
        onEdit(originData.id, date, content, emotion); // 일기 내용을 수정
      }
    }
    navigator('/', { replace: true }); // 일기 목록으로 이동, replace: true는 뒤로가기를 눌렀을 때 이전 페이지로 돌아가지 않도록 하는 것
  };

  const handleRemove = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      // 삭제하기
      onRemove(originData.id);
      navigator('/', { replace: true });
    }
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
        rightChild={
          isEdit && <MyButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />
        }
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
