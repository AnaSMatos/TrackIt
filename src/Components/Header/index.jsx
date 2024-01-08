import React, {useContext} from "react";
import AppContext from "../Context/AppContext";
import styled from "styled-components";

export default function Header(){
    const { data } = useContext(AppContext)
    return(
        <Top>
            <Logo>TrackIt</Logo>
            <Profile>
                <Img src={data.image}></Img>
            </Profile>
        </Top>
    )
}

const Logo = styled.p`
    font-family: 'Playball';
    font-size: 40px;
    color: #FFFFFF;
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

const Profile = styled.div`
    width: 51px;
    height: 51px;
    border-radius: 50%;
    overflow: hidden;
`

const Img = styled.img`
    height: 51px;
`