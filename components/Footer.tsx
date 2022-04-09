import { GetStaticProps } from 'next'
import React, { ReactNode, useState } from 'react'

const Footer = () => {
    return (
        <footer className="p-5 bg-footer text-white">
            <div className="d-flex justify-content-center">
            <p className="mb-0 text-center">© deep 2022. Все права защищены. Копирование информации запрещено.</p>
            </div>



        </footer>
    )
}

export default Footer