import React from "react"
import styled from "styled-components"
import FooterMenu from "../FooterMenu"
import Header from "../Header"


export default function PageLayout({children}){
    return(
        <Container>  
            <Header/>
            <Content>
                {children} 
            </Content>
            <FooterMenu/>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
`

const Content = styled.div`
    background-color: #f3f2f3;
    height: calc(100% - 140px);
    margin-top: 70px;
    margin-bottom: 70px;
    padding: 25px 15px;
    overflow-y: scroll;
`