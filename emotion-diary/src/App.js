import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';

// import RouteTest from './components/RouteTest';

//component
import MyButton from './components/MyButton';

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>

        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion1.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion2.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion3.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion4.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion/emotion5.png`} />

        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type={'positive'} />
        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type={'negative'} />
        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          {/* <Route path="/diary" element={<Diary />} /> */}
        </Routes>
        {/* <RouteTest /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
