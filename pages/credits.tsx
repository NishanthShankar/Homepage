import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import HeaderView from 'components/HeaderView/'
import Stores from 'stores'

import BaseLayout from 'components/baseLayout'

const Credits = () => {
  return (
    <BaseLayout>
      <div className='' style={{ flex: 1 }}>
        Credits
      </div>
    </BaseLayout>
  )
}

export default Credits
