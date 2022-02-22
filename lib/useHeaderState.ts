import { useEffect, useState } from 'react'
import Stores from 'stores'

const HeaderState = (state?: string) => {
  const setItem = Stores('headerStore')(state => state.actions.setItem)
  const currentState = Stores('headerStore')(state => state.openState)
  useEffect(() => {
    const finalState = state
      ? state
      : currentState === 'partial'
      ? currentState
      : 'closed'
    console.log('FINALSTATE:', state, currentState, finalState)
    setTimeout(() => {
      setItem('openState', finalState)
    })
  }, [])

  return null
}

export default HeaderState
