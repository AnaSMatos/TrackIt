import {useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './../Home/'
import Cadastro from './../Cadastro/'
import Habitos from './../Habitos/';
import Hoje from './../Hoje/';
import Historico from './../Historico/'
import AppContext from "../Context/AppContext";
import FooterMenu from '../FooterMenu';


export default function App(){
    const [data, setData] = useState({});
    const [meusHabitos, setMeusHabitos] = useState([]);
    const [percentage, setPercentage] = useState(0);

    return(
        <AppContext.Provider value={{data, setData, meusHabitos, setMeusHabitos,
        percentage, setPercentage}}>
            <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<Home setData={setData}/>}/>
                    <Route path='/cadastro' element={<Cadastro/>}/>
                    <Route path='/habitos' element={<Habitos/>}/>
                    <Route path='/hoje' element={<Hoje/>}/>
                    <Route path='/historico' element={<Historico/>}/>
                </Routes>
                <FooterMenu/>
            </div>
            </BrowserRouter>
            {/* <FooterMenu/> */}
        </AppContext.Provider>
    )
}

