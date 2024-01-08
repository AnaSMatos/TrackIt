import styled from "styled-components"
import { Link } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function FooterMenu(){
    const {percentage} = useContext(AppContext)

    return(
        <Menu>
            <StyledLink to={"/habitos"}>
                <p>Hábitos</p>
            </StyledLink>
            <StyledLink to={"/hoje"}>
                <Circulo>
                    <CircularProgressbar
                    value={percentage}
                    text={`Hoje`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52b6ff",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                />
                </Circulo>
            </StyledLink>
            <StyledLink to={"/historico"}>
                <p>Histórico</p>
            </StyledLink>
        </Menu>
    )
}

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
`;

const StyledLink = styled(Link)`
    color: #52B6FF;
    text-decoration: none;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 300;
    font-size: 18px;
`;

const Circulo = styled.div`
    width: 90px;
    margin-bottom: 45px;
`;
