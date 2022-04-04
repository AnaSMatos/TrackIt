import { useContext } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom"
import UserContext from "../Context/UserContext";
import picture from './../../Assets/TrackIt.png'
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Historico(){

    const { data } = useContext(UserContext);

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
            <Menu>
                <StyledLink to={"/habitos"}>
                    <p>Hábitos</p>
                </StyledLink>
                <StyledLink to={"/hoje"}>
                    <Circulo
                            value={0}
                            text={`Hoje`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#3e98c7",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                    />
                </StyledLink>
                <StyledLink to={"/historico"}>
                    <p>Histórico</p>
                </StyledLink>
            </Menu>
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

const Menu = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
    height: 70px;
`

const Circulo = styled(CircularProgressbar)`
    width: 91px;
    position: absolute;
    bottom: 10px;
    left: 38vw;
`

const StyledLink = styled(Link)`
    font-family: 'Lexend Deca',sans-serif;
    color: #52B6FF;
    font-size: 14px;

    p{
        font-size: 18px;
    }
    `;
