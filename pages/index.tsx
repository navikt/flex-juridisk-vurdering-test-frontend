import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Juridisk vurdering test frontend</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Velkommen til juridisk vurdering test frontend
        </h1>
      </main>
    </div>
  )
}

export default Home
