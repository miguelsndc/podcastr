import Head from 'next/head';

import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerProvider } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Podcastr</title>
      </Head>
      <PlayerProvider>
        <div className={styles.appWrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerProvider>
    </>
  );
}

export default MyApp;
