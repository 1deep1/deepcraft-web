import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout title='Главная'>
      <main>
        <h1>Hello World!</h1>
      </main>
    </Layout>
  )
}

export default Home
