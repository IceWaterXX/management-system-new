import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
let user = storageUtils.getUser()
memoryUtils.user =user
// 每次一上来就把user读取到并保存到内存中去 但是是在登录后刷新才会执行,所有在登录时还得先使用内存保存,之后刷新才走这个步骤
ReactDOM.render(

    <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);

