import React from 'react'
import * as Icons from './icons'

const Icon = ({ name, ...restProps }) => {
  switch (name) {
    case 'sun':
      return <Icons.SunIcon {...restProps} />
    case 'moon':
      return <Icons.MoonIcon {...restProps} />

    default:
      return <></>
  }
}

export { Icon }
