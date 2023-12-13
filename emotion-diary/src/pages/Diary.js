import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { getStringDate } from '../util/date';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import { emotionList } from '../util/emotion';

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        // 일기가 존재 할 때
        setData(targetDiary);
      } else {
        // 일기가 존재하지 않을 때
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    // 날짜 유효성 검사
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      return <div className="DiaryPage">Invalid date</div>;
    }

    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    // console.log('curEmotionData', curEmotionData);

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
          rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={['diary_img_wrapper', `diary_img_wrapper_${data.emotion}`].join(' ')}>
              <img src={curEmotionData.emotion_img} alt={curEmotionData.emotion_descript} />
              <div className="emotion_descript">{curEmotionData.emotion_descript}</div>
            </div>
          </section>

          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
