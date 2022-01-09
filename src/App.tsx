import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './components/pages/MainPage';
import './styles/App.scss';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<MainPage/>} />
    </Routes>
  );
}

export default App;
