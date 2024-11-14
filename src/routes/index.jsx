import { createBrowserRouter } from "react-router-dom";
import React from 'react';



import { Home, Cart, Login, Menu, Register, Checkout, CompletePayment, Admin } from "../containers";

import { Header, Footer } from "../components";
import { paths } from "../constants/path";
import { Validacao } from "./Validação";




export const router = createBrowserRouter([
   
   // {
   //    path: '/',
   //     e/ement: 
   //     (
   //         <>
   //         <TelaInicial/>
   //         </>
   //     )
   //     
   // },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/cadastro',
        element: <Register />,
    },
    {

        path: '/',
        element: (
        <>
        <Header/>
        <Home/>
        <Footer/>
        </>)
    },
    {
        path: '/cardapio',
        element:
        (
            <>
                <Header />
                <Menu />,
                <Footer />
            </>
        )
    },
    {
        path: '/carrinho',
        element: (
            <>
            <Header/>
            <Cart/>
            <Footer/>
            </>
        )
    },
    {
        path: '/checkout',
        element: (
            <>
                <Header/>
                <Checkout/>
                <Footer/>
            </>
        )
    },
    {
        path: '/complete',
        element: (
            <>
            <Header/>
            <CompletePayment/>
            <Footer/>
        </>
        )
    },

    {
        path: paths.Orders,
        element:(
            <>
            <Validacao>
                <Admin/>
                
            </Validacao>
                 <Footer/>
           
            </>
           
        )
    },
    {
        path: paths.ListProducts,
        element:(
            <>
            <Validacao>
                <Admin/>
            </Validacao>
                 <Footer/>
           
            
           </>
        )
    },

    {
        path: paths.NewProduc,
        element:(
            <>
            <Validacao>
                <Admin/>
                </Validacao>
                 <Footer/>
                 </>
            
           
        )
    },
    {
        path: paths.EditProduct,
        element:(
            <>
            <Validacao>
                <Admin/>
            </Validacao>
                 <Footer/>
           
            
           </>
        )
    },
    


]);