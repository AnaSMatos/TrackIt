import { useContext } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom"
import AppContext from "../Context/AppContext";
import picture from './../../Assets/TrackIt.png'

export default function Historico(){

    const { data } = useContext(AppContext);

    return(
        <>
            <Top>
                <Logo src={picture} alt=""/>
                <Img src={data.image}></Img>
            </Top>
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

const Top = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`

const Logo = styled.img`
    width: 97px;
    height: 30px;
`

const Img = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
`
const Content = styled.div`
    height: calc(100vh - 200px);
    margin-top: 100px;
    margin-bottom: 100px;
    box-sizing: border-box;
    padding: 0 20px;
    
`