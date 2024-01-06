import { useContext } from "react";
import styled from "styled-components"
import AppContext from "../Context/AppContext";

export default function Historico(){

    const { data } = useContext(AppContext);

    return(
        <>
            <Texto>Histórico</Texto>
            <Aviso>Em breve você poderá ver o histórico dos seus hábitos aqui!</Aviso>
         </>
    )
}

const Texto = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 23px;
`

const Aviso = styled.p`
    margin-top: 30px;
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    font-size: 18px;
`