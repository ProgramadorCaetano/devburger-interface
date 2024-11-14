
import Logo from '../../assets/Logo 1.png';
import React from "react";

import { Banner, Container, Content, Title } from './styles';
import { CartItems, CartResume } from '../../components';
export function Cart(){
    return(
        <Container>
            <Banner>
                <img src={Logo} alt="Logo devburger"/>
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content>
                <CartItems />
                <CartResume />
            </Content>
        </Container>
    )
}