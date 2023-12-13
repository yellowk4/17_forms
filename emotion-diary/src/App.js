import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';

// import RouteTest from './components/RouteTest';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      // const newItem = {
      //   ...action.data,
      // };
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: '오늘의 일기 1번',
//     date: new Date('2023-11-01').getTime(),
//   },
//   {
//     id: 2,
//     emotion: 2,
//     content: '오늘의 일기 2번',
//     date: new Date('2023-12-01').getTime(),
//   },
//   {
//     id: 3,
//     emotion: 3,
//     content: '오늘의 일기 3번',
//     date: new Date('2023-12-10').getTime(),
//   },
//   {
//     id: 4,
//     emotion: 4,
//     content: '오늘의 일기 4번',
//     date: new Date('2023-12-20').getTime(),
//   },
//   {
//     id: 5,
//     emotion: 5,
//     content: '오늘의 일기 5번',
//     date: new Date('2023-12-25').getTime(),
//   },
//   {
//     id: 6,
//     emotion: 5,
//     content: '오늘의 일기 6번',
//     date: new Date('2024-01-05').getTime(),
//   },
// ];

function App() {
  // const env = process.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || '';

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      if (diaryList.length > 0) {
        dataId.current = parseInt(diaryList[0].id) + 1;
      }
      // console.log('diaryList', diaryList);
      // console.log('dataId', dataId);

      dispatch({ type: 'INIT', data: diaryList });
    }
  }, []);

  const dataId = useRef(0);

  // console.log(new Date().getTime());

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { id: dataId.current, date: new Date(date).getTime(), content, emotion },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId,
    });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            {/* <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion1.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion2.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion3.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion4.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion5.png`} /> */}

            {/* <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type={'positive'} />
        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type={'negative'} />
        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              {/* <Route path="/diary" element={<Diary />} /> */}
            </Routes>
            {/* <RouteTest /> */}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
