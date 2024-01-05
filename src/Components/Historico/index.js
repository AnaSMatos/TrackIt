import { useContext } from "react";
import styled from "styled-components"
import AppContext from "../Context/AppContext";

export default function Historico(){

    const { data } = useContext(AppContext);

    return(
        <>
            <Content>
                <Texto>Histórico</Texto>
                <Aviso>Em breve você poderá ver o histórico dos seus hábitos aqui!</Aviso>
            </Content>
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

const Content = styled.div`
    height: calc(100vh - 200px);
    margin-top: 100px;
    margin-bottom: 100px;
    box-sizing: border-box;
    padding: 0 20px;
    
`