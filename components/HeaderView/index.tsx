import { useRef } from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import Stores from 'stores'
import cn from 'classnames'

export default function HeaderView (props: any) {
  const openState = Stores('headerStore')(state => state.openState)
  const setItem = Stores('headerStore')(state => state.actions.setItem)

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.closed]: openState === 'closed',
        [styles.partial]: openState === 'partial'
      })}
      onMouseOver={() => {
        if (props.home) return
        setItem('openState', 'partial')
      }}
      onMouseLeave={() => {
        console.log('ON MOUSE OUT:')
        if (props.home) return
        setTimeout(() => {
          setItem('openState', 'closed')
        }, 300)
      }}
    >
      {/* <div className={styles.logoCtn}></div> */}
      <div className={styles.linkCtn}>
        <li>
          <Link href={`/`}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={`/posts/`}>
            <a>Posts</a>
          </Link>
        </li>
        <li>
          <Link href={`/projects/`}>
            <a>Projects</a>
          </Link>
        </li>
        <Link href={`/credits/`}>
          <a>Credits</a>
        </Link>
        <li>Logout</li>
      </div>
    </div>
  )
}
