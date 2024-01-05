import { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import UserContext from "../Context/AppContext";
import picture from './../../Assets/TrackIt.png'
import axios from 'axios';
import Delete from "./../../Assets/lisho.png";

export default function Habitos(){
    const { data, meusHabitos, setMeusHabitos } = useContext(UserContext);
    
    const [create, setCreate] = useState(false)
    const [novoHabito, setNovoHabito] = useState({name: "", days: []})

    useEffect(() => {

        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)

        promisse.then(response => {
            setMeusHabitos(response.data)
        })
    }, [meusHabitos])

    function listDays(e, day){
        if(e.target.parentNode.className === "sc-kgflAQ htrXda nao-selecionado"){
            e.target.parentNode.className = "sc-kgflAQ htrXda selecionado"
            setNovoHabito({...novoHabito, days:[...novoHabito.days, day]})
            console.log(novoHabito)
        }else if(e.target.parentNode.className === "sc-kgflAQ htrXda selecionado"){
            e.target.parentNode.className = "sc-kgflAQ htrXda nao-selecionado"
            const index = novoHabito.days.indexOf(day);
            if (index > -1) {
                novoHabito.days.splice(index, 1);
                console.log(novoHabito)
            }
        }
    }

    function postHabit(){
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }

        const promisse = axios.post(url, novoHabito, config);
        promisse.then(response => {
            console.log(response)
            setCreate(false)
        })

        promisse.catch(err =>{
            alert(err.response.data.message);
        })
    }

    function deletar(hab){
        let confirm = window.confirm("Tem certeza que quer apagar esse hábito?");
        
        if(confirm){
            const config = {
                headers: {
                    Authorization : `Bearer ${data.token}`
                }
            }
            const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${hab.id}`, config)
            promisse.then(response => {
                alert("Hábito apagado")
            })

            promisse.catch(err => {
                alert("Não foi possivel deletar esse hábito")
            })
        }
    }

    return(
        <>
            <Top>
                <Logo src={picture} alt=""/>
                <Img src={data.image}></Img>
            </Top>



            <Content>
                <Titulo>
                    <Texto>
                        Meus Hábitos
                    </Texto>
                    <Button onClick={()=> setCreate(!create)}>
                        <p>+</p>
                    </Button>
                </Titulo>
                {create ? 
                    <Criar>
                        <input type="text" placeholder='nome do hábito' value={novoHabito.name} onChange={(e) => setNovoHabito({...novoHabito, name:e.target.value})}></input>
                        <Days>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 0)}><p>D</p></Day>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 1)}><p>S</p></Day>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 2)}><p>T</p></Day>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 3)}><p>Q</p></Day>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 4)}><p>Q</p></Day>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 5)}><p>S</p></Day>
                            <Day className='nao-selecionado' onClick={(e) => listDays(e, 6)}><p>S</p></Day>
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
                    :
                    <></>
                }
                
                <HabitsList> 
                    {meusHabitos.length === 0 ?
                        <Aviso>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Aviso>
                    :
                        meusHabitos.map((habito)=>{
                            return(
                                <Habito key={habito.id}>
                                    <Name>{habito.name}</Name>
                                    <Days>
                                        <Day className={habito.days.includes(0) ? "selecionado" : "nao-selecionado"}><p>D</p></Day>
                                        <Day className={habito.days.includes(1) ? "selecionado" : "nao-selecionado"}><p>S</p></Day>
                                        <Day className={habito.days.includes(2) ? "selecionado" : "nao-selecionado"}><p>T</p></Day>
                                        <Day className={habito.days.includes(3) ? "selecionado" : "nao-selecionado"}><p>Q</p></Day>
                                        <Day className={habito.days.includes(4) ? "selecionado" : "nao-selecionado"}><p>Q</p></Day>
                                        <Day className={habito.days.includes(5) ? "selecionado" : "nao-selecionado"}><p>S</p></Day>
                                        <Day className={habito.days.includes(6) ? "selecionado" : "nao-selecionado"}><p>S</p></Day>
                                    </Days>
                                    <button onClick={() => deletar(habito)}><img src={Delete}></img></button>
                                </Habito>
                                
                            )
                        })}
                </HabitsList>
            </Content>
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

const Name = styled.h1`
    font-size: 20px;
    color: #666666;
    font-family: 'Lexend Deca', sans-serif;
`

const Habito = styled.div`
    margin-top: 25px;
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.10);

    button{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
    }
`

const Logo = styled.img`
    width: 97px;
    height: 30px;
`

const Content = styled.div`
    height: calc(100vh - 200px);
    margin-top: 100px;
    margin-bottom: 130px;
    box-sizing: border-box;
    padding: 0 20px;
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
    border-radius: 4.63636px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    p{
        font-family: 'Lexend Deca', sans-serif;
        color: #FFFFFF;
        font-size: 27px;
    }
`

const Criar = styled.div`
    margin-top: 20px;
    width: 340px;
    height: 180px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        box-sizing: border-box;
        width: 303px;
        height: 45px;
        padding: 10px;
        margin: 15px;
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
    align-items: flex-end;
    width: 305px;

    .nao-selecionado{
        background: #FFFFFF;
        p{
            color: #DBDBDB;
        }
    }

    .selecionado{
        background: #CFCFCF;
        p{
            color: #FFFFFF;
        }
    }
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
    margin: 2px;

    p{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        color: #DBDBDB;
    }
`

const Buttons = styled.div`
    display: flex;
    margin-top: 20px;
    margin-left: 130px;
`

const Cancelar = styled.button`
    background: none;
    border: none;
    margin-right: 10px;
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
`

const Aviso = styled.p`
    margin-top: 30px;
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    font-size: 18px;
`

const Img = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
`
