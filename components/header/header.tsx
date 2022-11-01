import React from 'react'
import style from './header.module.scss'

function Header() {
  return (
    <nav className={"navbar navbar-dark"} style={{backgroundColor:'#202020'}}>
      <span className={"navbar-brand mx-3 h1"}>
        HandsOnCoding
      </span>
    </nav>
  )
}

export default Header