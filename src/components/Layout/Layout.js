import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Main from './Main'




const Layout = (props) => {
  return (
    <div>
    <Header/>
    <Sidebar page={props.page}/>
    <Main element={props.element} />
    <Footer/>
    </div>
  )
}

export default Layout