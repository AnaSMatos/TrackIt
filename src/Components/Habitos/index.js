import { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import UserContext from "../Context/AppContext";
import axios from 'axios';
import { days } from './days';

const DayComopnent = ({day, handleSelect = () => {}}) => {
    const [selected, setSelected] = useState(false)
    return(
        <Day
            selected={selected}
            onClick={() => {
                setSelected(!selected)
                handleSelect(day.number)
            }}
        >
            {day.display}
        </Day>
    )
}

export default function Habitos(){
    const { data, meusHabitos, setMeusHabitos } = useContext(UserContext);

    const config = {
        headers: {
            Authorization : `Bearer ${data.token}`
        }
    }
    
    const [create, setCreate] = useState(false)
    const [novoHabito, setNovoHabito] = useState({name: "", days: []})

    const getHabits = () => {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)

        promisse.then(response => {
            setMeusHabitos(response.data)
        })
    }

    useEffect(() => {
        getHabits()
    }, [])

    function postHabit(){
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        
        const promisse = axios.post(url, novoHabito, config);
        promisse.then((response) => {
            setCreate(false)
            setMeusHabitos([...meusHabitos, response.data])
        })

        promisse.catch(err =>{
            alert(err.response.data.message);
        })
    }

    function deletar(hab){
        let confirm = window.confirm("Tem certeza que quer apagar esse hábito?");
        
        if(confirm){
            const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${hab.id}`, config)
            promisse.then((response) => {
                alert("Hábito apagado")
                const newlst = meusHabitos.filter(item => item.id != hab.id)
                setMeusHabitos(newlst)
            })

            promisse.catch(err => {
                alert("Não foi possivel deletar esse hábito")
            })
        }
    }

    const handleSelect = (number) => {
        if(novoHabito.days.includes(number)){
            const newArray = novoHabito?.days.filter(item => item !== number);
            setNovoHabito({...novoHabito, days: newArray})
        }else{
            const newArray = [...novoHabito?.days, number]
            setNovoHabito({...novoHabito, days: newArray})
        }
    }

    return(
        <>
            <Titulo>
                <Texto>
                    Meus Hábitos
                </Texto>
                <Button onClick={()=> setCreate(!create)}>
                    <i className="fa-solid fa-plus"></i>
                </Button>
            </Titulo>
            {create && 
                <Criar>
                    <input type="text" placeholder='nome do hábito' value={novoHabito.name} onChange={(e) => setNovoHabito({...novoHabito, name:e.target.value})}></input>
                    <Days>
                        {
                            days.map((day, index) => (
                                <DayComopnent key={index} day={day} handleSelect={handleSelect}/>
                            ))
                        }
                    </Days>

                    <Buttons>
                        <Cancelar onClick={()=>{
                            setCreate(false);
                            }
                        }><p>Cancelar</p></Cancelar>
                        <Salvar onClick={() => {
                            postHabit();
                            setNovoHabito({name:"", days: []})
                            }}><p>Salvar</p></Salvar>
                    </Buttons>
                </Criar>
                }
                
            <HabitsList> 
                {meusHabitos.length === 0 ?
                    <Aviso>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Aviso>
                :
                    meusHabitos?.map((habito)=>{
                        return(
                            <Habito key={habito.id}>
                                <Name>{habito.name}</Name>
                                <Days>
                                    {days.map((day, index) => (
                                        <Day key={index} selected={habito.days.includes(day.number)}>{day.display}</Day>
                                    ))}
                                </Days>
                                <button onClick={() => deletar(habito)}>
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </Habito>
                            
                        )
                    })}
            </HabitsList>
        </>    
    )
}


const Name = styled.h1`
    font-size: 20px;
    color: #666666;
    font-family: 'Lexend Deca', sans-serif;
`

const Habito = styled.div`
    margin-top: 25px;
    width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px;
    position: relative;
    button{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 10px;
        top: 10px;
        border: none;
        background: none;
    }
`

const Titulo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Texto = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 23px;
`

const Button = styled.div`
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
`

const Criar = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 180px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    padding: 20px;
    box-sizing: border-box;

    input{
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        padding: 10px;
    }

    input::placeholder{
        color: #DBDBDB;
        font-size: 20px;
    }

    input:focus{
        outline: none;
    }
`

const Days = styled.div`
    display: flex;
    margin-top: 8px;
    gap: 4px;
`
const Day = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    color: ${({selected}) => selected ? '#FFFFFF' : '#DBDBDB' };
    font-size: 20px;
    font-family: 'Lexend Deca';
    background-color: ${({selected}) => selected ? '#CFCFCF' : '#FFFFFF'};
`

const Buttons = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
`

const Cancelar = styled.button`
    background: none;
    border: none;
    margin-right: 10px;
    width: 84px;
    height: 35px;
    p{
        font-size: 16px;
        color: #52B6FF;

    }
`
const Salvar = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    border: none;
    p{
        font-size: 16px;
        color: #FFFFFF;
    }
`

const HabitsList = styled.div`
    width: 100%;
`

const Aviso = styled.p`
    margin-top: 30px;
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    font-size: 18px;
`
