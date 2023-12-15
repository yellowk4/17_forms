import DiaryEditor from '../components/DiaryEditor';
import React, { useEffect } from 'react';

const New = () => {
  useEffect(() => {
    const titleElement = document.querySelector('title');
    // console.log('titleElement', titleElement);
    titleElement.innerText = `감정 일기장`;
  }, []);

  useEffect(() => {
    const titleElement = document.querySelector('title');
    // console.log('titleElement', titleElement);
    titleElement.innerText = `감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
