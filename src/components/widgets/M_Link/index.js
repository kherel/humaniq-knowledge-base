import React from 'react';
import * as T from "prop-types";
import {Link} from 'react-router'
import './styles.scss';
import {cssClassName} from 'utils'
const cn = cssClassName('M_Link')

const M_Link = ({mix, children, type, to, disabled}) => {

  const className= cn({disabled}, [mix])

  switch (type) {
    case 'external':
      return (
        <a
          className={className}
          href={to}
          target="_blank"
        >
          {children}
        </a>
      )

    case 'mailto':
      return (
        <a
          className={className}
          href={`mailto:${to}`}
        >
          {children}
        </a>
      )

    default:
      return (
        <Link className={className} to={to}>
          {children}
        </Link>
      )
  }
}

M_Link.propTypes = {
  mix: T.string, //BEM mixin from parent block
  disabled: T.bool,
  children: T.node.isRequired,
  to: T.string.isRequired,
  type: T.oneOf([
    'external', // opens external resource in new tab
    'mailto', // mailto link
  ]),
};

export default M_Link