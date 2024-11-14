
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';

import * as yup from "yup";

import React from 'react';

//import useHistory from "react";

import { useUser } from "../../hooks/UserContext.jsx";

import { api } from '../../services/api.js'

import Logo from '../../assets/Logo 1.svg'

import { Container, LeftContainer, RightContainer, InputContainer, Title, Form, Link } from './styles';

import { Button } from '../../components/Button';
import { useNavigate } from "react-router-dom";


export function Login() {

    //const history = useHistory();
    
    const navigate = useNavigate(); 
    const { putUserData } = useUser();

    const schema = yup
        .object({
            email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
            password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const {data: userData} = await toast.promise(
            api.post('/session', {
                email: data.email,
                password: data.password,
            }),
            {
                pending: 'Verificando seus dados 🔎',
                success: {
                    
                    render() {
                        setTimeout(() => {
                            if (userData.admin){
                                navigate('/pedidos');
                            } else {
                                navigate('/');
                            }
                        }, 2000);
                        return `Seja bem-vindo(a) 👌`;
                    },
                },
                error: 'Email ou senha incorretos 😒',
            },

        );
        
        putUserData(userData);
        
        

    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="Logo-devburger" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burger!</span> <br /> Acesse com seu <span> Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <Button type="submit">Entrar</Button>
                </Form>
                <p>Não possui conta? <Link to="/cadastro">Clique aqui.</Link></p>
            </RightContainer>
        </Container>
    )
}


