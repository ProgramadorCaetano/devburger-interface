import React from "react";
import { useLocation } from "react-router-dom";
import stripePromise from '../../config/stripeConfig';
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from '../../components/Stripe/CheckoutForm'

export function Checkout(){
    const {state: {clientSecret}} = useLocation();

    
if(!clientSecret){
    return (
        <div>Erro,volte etente novamente</div>
    )
}

    return(
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm/>
        </Elements>
    );
}