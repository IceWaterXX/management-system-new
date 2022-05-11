// import bingbao from './img/bingbao.gif'
// import lei from './img/lei.gif'
// import qing from './img/qing.gif'
// import shachen from './img/shachen.gif'
// import wu from './img/wu.gif'
// import xue from './img/xue.gif'
// import yin from './img/yin.gif'
// import yu from './img/yu.gif'
// import yun from './img/yun.gif'
// export const picts = {
//     bingbao,lei,qing,shachen,wu,xue,yin,yu,yun
// }

let maths = {
    bingbao : "" ,
    lei : "" ,
    qing : "" ,
    shachen : '',
    wu: '',
    xue: '',
    yin: '',
    yu: '',
    yun: ''
}
const pict = Object.keys(maths).map((index)=>{maths[index] =require('./img/'+index+'.gif')});
    export default maths
