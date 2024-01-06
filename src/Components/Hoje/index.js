import { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import check from './../../Assets/Check.png'
import dayjs from 'dayjs';
import axios from 'axios';
import AppContext from '../Context/AppContext';

export default function Hoje(){

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const { data } = useContext(AppContext);
    const [habitosHoje, setHabitosHoje] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [numHabitos, setNumHabitos] = useState(1);
    const [numConcluidos, setNumConcluidos] = useState(0);


    useEffect(() => {

        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

        promisse.then(response => {
            let count = 0
            let hab = 0
            setHabitosHoje(response.data)
            for(let i = 0; i < habitosHoje.length; i++){
                if(habitosHoje[i].done){
                    count++;
                }
                hab++;
            }

            setNumConcluidos(count)
            setNumHabitos(hab)
        })
    }, [])

    useEffect(() => {
        setPercentage((numConcluidos/numHabitos)*100)
    }, [numConcluidos])

    
    function marcarHabito(id){
        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,'', config)
        promisse.catch(response => {
            alert("Algo deu errado! Recarregue o site")
        })
    }

    function desmarcarHabito(id){
        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }

        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,'', config)

        promisse.catch(response => {
            alert("Algo deu errado! Recarregue o site")
        })
    }


    function selecionar(e, id, done){
        if (e.target.parentNode.className === "sc-himrzO fSWMIl not-selected"){
            e.target.parentNode.className = "sc-himrzO fSWMIl selected"
            marcarHabito(id);
        }else if(e.target.parentNode.className === "sc-himrzO fSWMIl selected")   {
                e.target.parentNode.className = "sc-himrzO fSWMIl not-selected"
                desmarcarHabito(id);
        }
    }
    
    let dia = dayjs().format('DD/MM')
    return(
        <>
            <Texto>{weekdays[dayjs().day()]}, {dia}</Texto>
            {habitosHoje.map((habito, index) => {
                return(
                    <Habito key={index}>
                        <Infos>
                            <h1>{habito.name}</h1>
                            <p>Sequência atual: {habito.currentSequence} dias</p>
                            <p>Seu recorde: {habito.highestSequence} dias</p>
                        </Infos>
                        <Feito className={habito.done ? "selected" : "not-selected"} onClick={(e) => selecionar(e, habito.id, habito.done)}>
                            <img src={check} alt=""></img>
                        </Feito>
                    </Habito>
                )
            })}
        </>
    )
}

const Habito = styled.div`
    margin-top: 20px; 
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.10);
    .not-selected{
        background: #EBEBEB;
    }

    .selected{
        background: #8FC549;
    }
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
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Texto = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 23px;
`