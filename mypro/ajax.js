//开启严格模式
"use strict";
// 要封装一个函数，保存重用的代码：
// 1.代码中所有不确定的，都定义成形参变量
// 2.所有不一定执行的代码，都要加判断条件。
//三个参数
//1.url：要请求的目标服务端的接口地址
//2.type：不同的请求类型
//3.callback：条用者自定义的函数，会在调用时提前传入AJAX内部，但是不是立刻执行
//4.data：要发送的参数，要求必须是：
//"变量1=值1&变量2=值2..."
//不要带问号
//且必须是字符串
//强调：回调函数总是需要的
var ajax = function (url, type, callback, data) {
    var xhr = new XMLHttpRequest();//不变
    //如果发送get请求时，带参数
    if (type == "get" || type == "delete") {
        //则需要将参数用?连接到url地址结尾
        if (data) url += data;
        xhr.open(type, url, true);
        //而如果是get请求，send()中什么都没有
        xhr.send();
    } else {
        xhr.open(type, url, true);
        //只有发送的是post请求时，才需添加请求头
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //只有post请求，才会将参数放在send()中发送
        if (data) xhr.send(data);
        else xhr.send();
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            // 缺少一段自定义的代码来对result执行不同的操作
            // 之后，只要一段代码不确定时，也可用形参变量来解决
            // 只不过这个形参变量传入的不是一个值，而是一个函数
            callback(result);
        }
    }
}
//export default ajax;