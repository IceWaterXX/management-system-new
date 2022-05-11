import React, { Component ,Fragment} from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './home/home'
import Detail from './detail/detail'
import AddUpadte from './addUpadte/addUpadte'

export default class Product extends Component {
  render() {
    return (
      <Fragment>
            <Routes>
              {/* 因为新版都为完全匹配,所有/在第一个也没事,如果还是原来那种模糊匹配,/需要在最后 */}
                  <Route path='/' element={<Home/>}/>
                  <Route path='detail' element={<Detail/>}/>
                  <Route path='data' element={<AddUpadte/>}/>
            </Routes>
      </Fragment>
    )
  }
}
