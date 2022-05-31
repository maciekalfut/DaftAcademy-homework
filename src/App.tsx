import React from 'react';
import {Routes, Route, Link} from "react-router-dom";
import{Navigation} from './navigation'
import './App.css';
import {InputForm} from "./InputForm";
import {PolicyPage} from "./policy";
import { Contact } from './contact';
import { AboutPage } from './about';



function App() {
    return (
        <div className="App">
          <div className='logo'>
                    <h1>Homework</h1>
                    
                </div>
          <Navigation/>
          <Routes>
                <Route path='/' element={<InputForm defaultValue={'siema eniu'}/>}/>
                <Route path='*' element={<div>404</div>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/policy' element={<PolicyPage/>}/>
                <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </div>
    );
}

export default App;