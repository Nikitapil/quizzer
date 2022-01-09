import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './components/pages/MainPage';
import { QuestionPage } from './components/pages/QuestionPage';
import './styles/App.scss';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<MainPage/>} />
      <Route path = '/questions' element = {<QuestionPage/>} />
    </Routes>
  );
}

export default App;
