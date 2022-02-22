import React, { ReactChildren, ReactChild, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './baseLayout.module.css'
import HeaderView from 'components/HeaderView/index'
import useHeaderState from 'lib/useHeaderState'

interface LayoutProps {
  firebase?: boolean
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
}

const name = 'Nishanth'
export const siteTitle = 'Next.js Sample Website'

const BaseLayout: NextPage<LayoutProps> = ({
  children,
  firebase
}: LayoutProps) => {
  useHeaderState()
  useEffect(() => {
    import('firebase/app')
      .then(firebase => {
        firebase.initializeApp({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        })
      })
      .catch(() => {})
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <HeaderView />
      <div className='flex-ctn flex'>{children}</div>
    </div>
  )
}

export default BaseLayout
