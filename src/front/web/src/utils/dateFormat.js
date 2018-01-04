
var dateNow = function(){
    var dateNow = '';
    var now = new Date();
    var dateObj = {};

    // 提取年月日、时分秒
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();

    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    // 补0操作
    hour = (hour<10 ? '0' : '') + hour
    min = (min<10 ? '0' : '') + min
    sec = (sec<10 ? '0' : '') + sec

    dateNow = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
    dateObj['dateNow'] = dateNow;
    dateObj['month'] = month;

    return dateObj;
}

export default dateNow;