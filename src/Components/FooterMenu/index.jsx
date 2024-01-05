import styled from "styled-components"
import { Link } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { useContext, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function FooterMenu(){
    const {percentage, setPercentage} = useContext(AppContext)
    // const [percentage, setPercentage] = useState(0);

    return(
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
    font-family: 'Lexend Deca',sans-serif;
    color: #52B6FF;
    font-size: 14px;

    p{
        font-size: 18px;
    }
`;

const Circulo = styled(CircularProgressbar)`
    width: 91px;
    position: absolute;
    bottom: 10px;
    left: 38vw;
`;
