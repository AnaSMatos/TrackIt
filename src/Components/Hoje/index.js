import { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import picture from './../../Assets/TrackIt.png'
import check from './../../Assets/Check.png'
import { Link } from 'react-router-dom';
import UserContext from "../Context/UserContext";
import dayjs from 'dayjs';
import axios from 'axios';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function Hoje(){

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const { data } = useContext(UserContext);
    const [habitosHoje, setHabitosHoje] = useState([]);
    const [concluidos, setConcluidos] = useState([]);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {

        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

        promisse.then(response => {
            setHabitosHoje(response.data)
        })
    }, [])


    function addConcluidos(id){
        if(concluidos.includes(id)){
            const index = concluidos.indexOf(id);
            if (index > -1) {
                concluidos.splice(index, 1);
            }
        }else{
            setConcluidos([...concluidos, id]);
        }
    }

    
    let dia = dayjs().format('DD/MM')
    return(
        <>
            <Top>
                <Logo src={picture} alt=""/>
                <Img src={data.image}></Img>
            </Top>
            <Content>
                <Texto>{weekdays[dayjs().day()]}, {dia}</Texto>
                {habitosHoje.map((habito, index) => {
                    return(
                        <Habito key={index} onClick={()=> {
                            addConcluidos(habito.id)
                            }}>
                            <Infos>
                                <h1>{habito.name}</h1>
                                <p>Sequência atual: {habito.currentSequence} dias</p>
                                <p>Seu recorde: {habito.highestSequence} dias</p>
                            </Infos>
                            <Feito>
                                <img src={check} alt=""></img>
                            </Feito>
                        </Habito>
                    )
                })}
            </Content>
            <Menu>
                <StyledLink to={"/habitos"}>
                    <p>Hábitos</p>
                </StyledLink>
                <StyledLink to={"/hoje"}>
                    <Circulo
                        value={percentage}
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

const Habito = styled.div`
    margin-top: 20px; 
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid black;
`

const Infos = styled.div`
    display: flex;
    flex-direction: column;

    h1{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        color: #666666;
        margin-bottom: 7px;
    }

    p{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 13px;
        color: #666666;
    }
`
const Feito = styled.div`
    width: 69px;
    height: 69px;
    background: #EBEBEB;
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Circulo = styled(CircularProgressbar)`
    width: 91px;
    position: absolute;
    bottom: 10px;
    left: 38vw;
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
    background-color: #FFFFFF;
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
