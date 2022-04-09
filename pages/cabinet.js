import React, { SyntheticEvent, useEffect, useState, Component } from "react";
import { render } from 'react-dom'
import Layout from "../components/Layout";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Button } from "reactstrap";
import Link from "next/link";

import Router from 'next/router'

export default function Cabinet(props) {
    const [user, setUser] = useState('');
    const [drag, setDrag] = useState(false)


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
      })

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (event) => {        
        const body = new FormData();
        // console.log("file", image)
        body.append("file", image, user);    
        const response = await fetch("/api/upload", {
        method: "POST",
        body
        });
        console.log(body)
        Router.reload()
    };

    return (
        <Layout title="Личный кабинет">
            {!user && 
            <main className='content'>
                <div className="row">
                    <div className="col">
                        <Link href="/">
                    <Button
                        color="primary"
                    >
                        Назад
                    </Button>
                    </Link>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-md-start text-center">
                            <h2>Вы не вошли в аккаунт!</h2>
                        </div>
                    </div>
                </div>
                </main>
                }

                {user && 
                <main className='content'>
                <div className="row">
                    <div className="col">
                        <Link href="/">
                    <Button
                        color="primary"
                        className="m-3"

                    >
                        Назад
                    </Button>
                    </Link>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6 text-md-start text-center">
                        <h2>Привет, {user}!</h2>
                    </div>
                    <div className="col-12 col-md-6 m-md-0 m-4">
                        <h3 className="mb-3">Загрузить свой скин:</h3>
                        <form>
                        {drag
                            ? <div 
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                            className="drop-area drop-area-hover m-3 ms-0">
                            <input type="file" accept='image/png, image/jpeg' className="form-control-pic p-0" onChange={uploadToClient}/>
                            </div> 
                            : <div onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                            className="drop-area m-3 ms-0">
                                { createObjectURL ? <img src={createObjectURL} /> : '' }
                            <input type="file" accept='image/png' className="form-control-pic p-0" onChange={uploadToClient}/>
                            
                            </div>
                        }
                        </form>
                        <Button
                            color="primary"
                            onClick={uploadToServer}
                            className="m-3 ms-0"
                            type="submit"
                            >
                            Загрузить
                        </Button>

                    </div>
                </div>
            </main>
            }
        </Layout>
    )
}
