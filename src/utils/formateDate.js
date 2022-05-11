// export function formateDate(time) {
//     if (!time) return ''
//     let date = new Date(time)
//     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//     + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
//     }
export function formateDate(time) {
        if (!time) return ''
        var date = new Date();
        var s1 = "-";
        var s2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + s1 + month + s1 + strDate + " " + date.getHours() + s2 + date.getMinutes() + s2 + date.getSeconds();
        return currentdate;
        }