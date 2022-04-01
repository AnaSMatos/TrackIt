import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Imagem from "./../../Assets/Logo.png"
import axios from "axios";
import { useNavigate } from "react-router";

export default function Home({setData}){

    const navigate = useNavigate();
    const [email, setEmail] = useState("clara@driven.com");
    const [senha, setSenha] = useState("clara");

    function handleSubmit(e){
        e.preventDefault();
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
        const promisse = axios.post(URL, {
            email: email,
            password: senha
        })

        promisse.then(response => {
            setData(response.data)
            navigate("/hoje")
        });

        promisse.catch(error => {
            alert("Ocorreu um erro. Recarregue a página e tente novamente")
        })
    }

    return(
        <Container>
            <Logo>
                <img src={Imagem} alt=""></img>
            </Logo>

            <Form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <input type="password" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required></input>
                <button type="submit"><p>Entrar</p></button>
            </Form>

            <StyledLink to={"/Cadastro"}>
                Não tem uma conta? Cadastre-se!
            </StyledLink>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 85px;
`;
const Logo = styled.div`
    img{
        width: 180px;
        height: 178.38px;
    }
`;

const Form = styled.form`
    margin-top: 35px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    input{
        width: 303px;
        height: 45px; 
        border: 1px solid #D5D5D5;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 7px;
    }

    input::placeholder{
        color: #DBDBDB;
        font-size: 20px;
    }

    input:focus{
        outline: none;
    }

    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
    }

    button p{
        color: #FFFFFF;
        font-size: 21px;
    }
`;

const StyledLink = styled(Link)`
    font-family: 'Lexend Deca',sans-serif;
    color: #52B6FF;
    font-size: 14px;
`;
