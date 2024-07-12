import { useState } from 'preact/hooks'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './app.css'
import { Home } from './Pages/Home.tsx';
import { Game } from './Pages/Game.tsx';
import Sidebar from './Pages/Sidebar.tsx';

export function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element =  {<div className = "flex justify-evenly"> <Sidebar/> <Home/> </div>} />
        <Route path="/game" element = {<div className = " "> <Game /></div>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
