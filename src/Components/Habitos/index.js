import { useContext, useEffect } from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"
import UserContext from "../Context/UserContext";
import picture from './../../Assets/TrackIt.png'
import axios from 'axios';

export default function Habitos(){
    const { data, meusHabitos, setMeusHabitos } = useContext(UserContext);

    useEffect(() => {

        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)

        promisse.then(response => {
            console.log(response.data)
        })
    }, [])

    return(
        <>
            <Top>
                <Logo src={picture} alt=""/>
                <Img src={data.image}></Img>
            </Top>

            <Content>
                <Texto>
                    Meus Hábitos
                </Texto>

            </Content>
            <Menu>
                <StyledLink to={"/habitos"}>
                    <p>Hábitos</p>
                </StyledLink>
                <StyledLink to={"/hoje"}>
                    <p>Hoje</p>
                </StyledLink>
                <StyledLink to={"/"}>
                    <p>Histórico</p>
                </StyledLink>
            </Menu>
        </>    
    )
}

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

const Content = styled.div`
    height: calc(100vh - 200px);
    margin-top: 100px;
    margin-bottom: 100px;
    box-sizing: border-box;
    padding: 0 20px;
`

const Texto = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 23px;
`

const Img = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
`

const Menu = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
    height: 70px;
    `

const StyledLink = styled(Link)`
    font-family: 'Lexend Deca',sans-serif;
    color: #52B6FF;
    font-size: 14px;

    p{
        font-size: 18px;
    }
    `;

