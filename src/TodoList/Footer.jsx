import React from 'react'


export default function Footer() {


  var years = new Date().getFullYear()


  return (

    <footer className='footer'>

      <h3>CopyrightÂ©{years}</h3>

    </footer>
  )
}
