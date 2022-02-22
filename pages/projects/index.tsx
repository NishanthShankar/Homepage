import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from 'components/layout'
import HeaderView from 'components/HeaderView/'
import Stores from 'stores'
import useHeaderState from 'lib/useHeaderState'
import projects from 'data/projects.json'
const Projects = () => {
  useHeaderState()

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <HeaderView />
        <div className='' style={{ flex: 1, padding: 72 }}>
          Projects
          {projects.map(project => (
            <Link href={project.link || '.'}>
              <h1>{project.title}</h1>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Projects
