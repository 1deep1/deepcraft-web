import { NextPage } from "next";
import React, { SyntheticEvent, useState } from "react";
import Layout from "../components/Layout";

const Register: NextPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('https://api.1deep1.ru/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        setRedirect(true);
    }

    if (redirect) {

    }

    return (
        <Layout>
        <div className="text-center">
    
        <div className="form-signin">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal form-title">Регистрация:</h1>
        
            <div className="form-floating">
            <input type="login" className="form-control" id="floatingInput" placeholder="логин" required
            onChange={e => setUsername(e.target.value)}
            />
            <label>Логин</label>
            </div>
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
        
            <button className="w-100 btn btn-lg btn-success" type="submit">Зарегаться</button>
        </form>
        </div>
        
        
            
        </div>
        </Layout>
    )
}

export default Register