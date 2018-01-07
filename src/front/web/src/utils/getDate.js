var getDate = function(){
    var date = new Date();
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var dates = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var accountSid = '4ba2b102bb8843cf910abc70ce0ae660';
    var token = '4fc2b75b7b53426e824ae0c24028d69f';
    var times = year + '' + mon + '' + dates + '' + hour + '' + min + '' + sec;
    return times;
}

export default getDate;