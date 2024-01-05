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
    background-color: #f3f2f3;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`

const Content = styled.div``
