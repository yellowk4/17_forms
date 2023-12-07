import React, { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
      const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();
      setData(
        diaryList.filter((it) => {
          const itemDate = new Date(it.date).getTime();
          return firstDay <= itemDate && itemDate <= lastDay;
        })
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const changeMonth = (amount) => {
    const newDate = new Date(curDate.getFullYear(), curDate.getMonth() + amount, curDate.getDate());
    setCurDate(newDate);
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={() => changeMonth(-1)} />}
        rightChild={<MyButton text={'>'} onClick={() => changeMonth(1)} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
