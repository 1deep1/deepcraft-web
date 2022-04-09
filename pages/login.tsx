import React, { SyntheticEvent, useState } from "react";
import Layout from "../components/Layout";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Login: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('https://api.1deep1.ru/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
            })
        });

        setRedirect(true);
    }

    return (
        <Layout>
        <div className="text-center">
        <div className="form-signin">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal form-title">Войти:</h1>
        
            <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
            onChange={e => setEmail(e.target.value)}
            />
            <label>Email</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
            onChange={e => setPassword(e.target.value)}
            />
            <label>Пароль</label>
            </div>
        
            <button className="w-100 btn btn-lg btn-success" type="submit">Проникновение</button>
        </form>
        </div>
        </div>
        </Layout>
    )
}


export default Login