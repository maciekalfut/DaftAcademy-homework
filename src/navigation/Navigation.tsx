import React from 'react';
import {Routes, Route, Link} from "react-router-dom";
export const Navigation = () =>{
    return <div className='App-header'>
                
                
                <div>
                    <Link className='App-link' to={'/'}>Home</Link>
                    <Link className='App-link' to={'/about'}>About</Link>
                    <Link className='App-link' to={'/contact'}>Contact</Link>
                    <Link className='App-link' to={'/policy'}>Policy</Link>
                </div>
            </div>
    
}


export{}