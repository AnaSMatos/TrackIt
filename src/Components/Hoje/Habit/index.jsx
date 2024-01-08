import { useState, useContext } from "react";
import styled from "styled-components";
import check from './../../../Assets/Check.png'
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';
import AppContext from "../../Context/AppContext";

export default function Habit({habito, getTodaysHabits}){
    const { data } = useContext(AppContext);
    const config = {
        headers: {
            Authorization : `Bearer ${data.token}`
        }
    }

    const [isLoading, setIsLoading] = useState(false)

    function handleSelect(habito) {
        const {id, done} = habito
        if(!done){
            setIsLoading(true)
            const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, '', config)
            promisse
            .then((response) => {
                getTodaysHabits()
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            })
        }else{
            setIsLoading(true)
            const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, '', config)
            promisse
            .then((response) => {
                getTodaysHabits()
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            })
        }
    }

    return(
        <Habito>
            <Infos>
                <h1>{habito.name}</h1>
                <p>Sequência atual: {habito.currentSequence} dias</p>
                <p>Seu recorde: {habito.highestSequence} dias</p>
            </Infos>
            <CheckButton disabled={isLoading} checked={habito.done} onClick={() => handleSelect(habito)}>
                {isLoading ? 
                <ThreeDots color="#fff" height={13}/>  
                :
                <img src={check} alt=""></img>
                }
            </CheckButton>
        </Habito>
    )
}

const Habito = styled.div`
    margin-top: 20px; 
    width: 100%;
    height: 94px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px;
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
const CheckButton = styled.button`
    width: 69px;
    height: 69px;
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({checked}) => checked ? '#8FC549' : '#EBEBEB'};
`