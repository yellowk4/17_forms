import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef } from 'react';
import Lifecycle from './Lifecycle';

// const dummyList = [
//   {
//     id: 1,
//     author: '홍길동',
//     content: '안녕하세요',
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: '홍길',
//     content: '안녕하세요',
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '아무개',
//     content: '안녕하세요',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: '심청이',
//     content: '안녕하세요',
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      created_date,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(data.map((it) => (it.id === targetId ? { ...it, content: newContent } : it)));
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
