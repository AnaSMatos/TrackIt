import { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import dayjs from 'dayjs';
import axios from 'axios';
import AppContext from '../Context/AppContext';
import Habit from './Habit';

export default function Hoje(){
    const { setPercentage} = useContext(AppContext)

    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const { data } = useContext(AppContext);
    const [habitosHoje, setHabitosHoje] = useState([]);

    const config = {
        headers: {
            Authorization : `Bearer ${data.token}`
        }
    }

    function calculatePercentage() {
        const habitsNumber = habitosHoje?.length || 0
        const doneNumber = habitosHoje?.reduce((count, hab) => hab.done ? count + 1 : count, 0);
        if(habitsNumber === 0) {
            setPercentage(0)
        }else{
            setPercentage((doneNumber/habitsNumber)*100)
        }
    }

    useEffect(() => {
        calculatePercentage()
    }, [habitosHoje])

    function getTodaysHabits() {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promisse
        .then((response) => {
            setHabitosHoje(response.data)
        })
        .catch((error) => {
            alert("Erro ao carregar dados")
        })
    }

    useEffect(() => {
        getTodaysHabits()
    }, [])

    
    let dia = dayjs().format('DD/MM')
    return(
        <>
            <Texto>{weekdays[dayjs().day()]}, {dia}</Texto>
            {habitosHoje.map((habito, index) => (
                <Habit key={index} habito={habito} getTodaysHabits={getTodaysHabits}/>
            ))}
        </>
    )
}


const Texto = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 23px;
`