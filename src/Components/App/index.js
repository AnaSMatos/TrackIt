import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Home from './../Home/'
import Cadastro from './../Cadastro/'

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

