import React from 'react'
import * as T from 'prop-types'
import './styles.scss'
import A_Logo_H from 'A_Logo_H'
import {cssClassName} from 'utils'

const cn = cssClassName('kb-header')


const Header = ({mix}) => (
  <header
    className={cn([mix])}
  >
    <A_Logo_H
      mix={cn('logo')}
    />
  </header>
)

Header.propTypes = {
  mix: T.string, //BEM mixin from parent block
};

export default Header