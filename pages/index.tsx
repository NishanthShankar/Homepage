import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from 'components/layout'
import HeaderView from 'components/HeaderView/'
import useHeaderState from 'lib/useHeaderState'
import bodshot from 'assets/images/bodshot.jpg'

const Home = () => {
  useHeaderState('open')
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <HeaderView home />
        <div
          className=''
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#e2e5e4'
          }}
        >
          <img
            src={'/images/bodshot.png'}
            style={{ right: '20vw', position: 'absolute', height: '100vh' }}
          />
        </div>
      </div>
    </>
  )
}

export default Home
