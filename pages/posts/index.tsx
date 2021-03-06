import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout, { siteTitle } from 'components/layout'
import { getSortedPostsData } from 'lib/posts'
import utilStyles from 'styles/utils.module.css'
import Date from 'components/date'
import HeaderView from 'components/HeaderView'
import BaseLayout from 'components/baseLayout'
const Home = ({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <BaseLayout>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          I'm going to develop this site soon
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </BaseLayout>
  )
}

export async function getStaticProps () {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default Home
