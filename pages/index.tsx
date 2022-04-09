import type { NextPage } from 'next'
import Image from 'next/image'
import { SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'

import { Modal, ModalBody } from "reactstrap";
import React from 'react';
import Link from 'next/link';

const Home: NextPage = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState('');

  const [modalReg, setModalReg] = React.useState(false);
  const [modalLog, setModalLog] = React.useState(false);

useEffect(() => {
  (
    async () => {
      const response = await fetch('https://api.1deep1.ru/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
      });
  
      const content = await response.json();
  
      setUser(content.username);
    }
  )();
});
  

  const logout = async () => {
      await fetch('https://api.1deep1.ru/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    setRedirect(true);
  }

  const register = async (e: SyntheticEvent) => {
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

  const login = async (e: SyntheticEvent) => {
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

  if (redirect) {
    Router.reload()
  }

  return (
    <Layout title='Главная'>
      <main className='content'>
        <div className="row">
          <div className="m-auto col d-flex row justify-content-center text-center">
            <div className="mb-5 px-md-1 px-4"><Image src="/logo.svg"width={675} height={97} /></div>
            <h2 className='title mb-3 text-center'>Сервера для настоящих <br />кибермужиков</h2>

              {!user &&
              <div className='main-buttons text-center'>
                <button type="button" className="btn btn-outline-light m-2 m-md-4 px-5"
                onClick={() => setModalReg(!modalReg)}
                >Регистрация</button>
                <button type="button" className="btn btn-outline-light m-2 m-md-4 px-5"
                onClick={() => setModalLog(!modalLog)}
                >Вход</button>
                <Link href="https://m.1deep1.ru/Launcher.exe"><button type="button" className="btn btn-success m-2 m-md-4 px-5">Скачать</button></Link>
              </div>
              }

              {user &&
              <div className='main-buttons text-center'>
                <Link href="/cabinet"><button type="button" className="btn btn-outline-light m-2 m-md-4 px-5">Личный кабинет</button></Link>
                <button type="button" className="btn btn-outline-light m-2 m-md-4 px-5"
                onClick={() => logout()}
                >Выход</button>
                <Link href="https://m.1deep1.ru/Launcher.exe"><button type="button" className="btn btn-success m-2 m-md-4 px-5">Скачать</button></Link>
              </div>
              }
              
          </div>
        </div>
      </main>

      <Modal toggle={() => setModalReg(!modalReg)} isOpen={modalReg}>
        <div className=" modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Регистрация:
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalReg(!modalReg)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
        <div className="text-center">
    
        <div className="form-signin">
        <form onSubmit={register}>
        
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
        </ModalBody>
      </Modal>

      <Modal toggle={() => setModalLog(!modalLog)} isOpen={modalLog}>
        <div className=" modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Вход:
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalLog(!modalLog)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
        <div className="text-center">
        <div className="form-signin">
        <form onSubmit={login}>
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
        </ModalBody>
      </Modal>

    </Layout>
  )
}

export default Home
