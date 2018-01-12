import React from 'react';
import A_Logo_H from 'A_Logo_H'
import M_Link from 'M_Link'
import './styles.scss';
import {cssClassName} from 'utils'
const cn = cssClassName('kb-header')

const Header = ({children}) => (
  <header
    className={cn()}
  >
    <M_Link
      mix={cn('logo')}
      type='external'
      to='https://humaniq.com/'
    >
      <A_Logo_H />
    </M_Link>

    {children}

  </header>
)

export default Header