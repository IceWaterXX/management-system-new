import React from 'react'
import './index.less'

export default function LinkButton(props) {
  return (
    <button {...props} className='linkbutton'>{props.children}</button>
  )
}
