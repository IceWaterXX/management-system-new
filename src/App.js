import React, { Component, Fragment } from 'react'
import { useNavigate ,Route,Routes,Navigate} from 'react-router-dom'
import { Button } from 'antd';
import Admain from './pages/admain';
// import Loading from './pages/loading';
 import Loading from './pages/loading/Loading';
import './App.less';


export default function App() {
  const navigate = useNavigate()
  React.useEffect(()=>{
      // console.log(navigate);
      //  navigate('/admain')

  },[])
  return (
    < Fragment>
      <Routes>
        <Route path='/admin/*' element={<Admain/>}/>
        <Route path='/loading' element={<Loading/>}/>
        <Route path='/' element={<Loading/>}/>
      </Routes>
    </Fragment>
  )
}



