import React from 'react'
import * as T from 'prop-types'
import './styles.scss'
import { cssClassName } from 'utils'

const cn = cssClassName('A_RequestMethod')

const A_RequestMethod = ({ mix, type }) => {
  type = type.toLowerCase()
  return (<span className={cn([mix], {type})}>{type}</span>)
}

export default A_RequestMethod

A_RequestMethod.propTypes = {
  mix: T.string, //BEM mixin from parent block
  type: T.oneOf([
    'GET',
    'POST',
    'PUT',
  ]).isRequired,
}
