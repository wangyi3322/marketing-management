/**
 * Created by Administrator on 2017/6/13.
 *
 */
var baseUrl = "http://10.0.0.227:8080";
// var baseUrl = "http://10.0.0.100:8080";
//var baseUrl = "http://www.huilizaixian.com";
var imgUrl = "http://hmkj-1.oss-cn-shanghai.aliyuncs.com/";
var hid = ''
function V(name) {
    return $.trim($("#" + name + "").val());
}
function I(name) {
    return $.trim($("#" + name + "").html());
}
/*标签赋值*/
function IH(name, val) {
    $("#" + name + "").html(val);
}
function CA(name, val) {
    $("." + name + "").html(val);
}
function CApend(name, val) {
    $("." + name + "").append(val);
}
function IV(name, val) {
    $("#" + name + "").val(val);
}
//判断后台传值是否为null
function commonNull(objone,obj,str,strs){
    if(objone != null){
        obj.html(str);
    }else{
        obj.html(strs);
    }
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}
//设置coodekis
function SetCookie(name, value) {
    var Days = 1; //此 cookie 将被保存 1 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
 if(getCookie('hid')){
    hid = getCookie('hid');
 }else{
     hid = '';
 }

/*页面跳转*/
function H(href) {
    window.location.href = href;
}
//金额以万为单位展示
function moundCeil(num){
    var n = Math.round((num /10000) * 100) / 100;
    return n;
}
//金额三个一组，，隔开
function fmoney(s, n) {
    /*--s  表示 需要转换的金额

    --n 表示 保留几位小数*/
    s = s+"";
    var first = s.charAt(0);
    if(first == "-"){
        s = s.substring(1,s.length);
    }else{
        first = '';
    }
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return first + t.split("").reverse().join("") + "." + r;
}
function countDown(secs, surl) {
    //alert(surl);
    var jumpTo = document.getElementById('jumpTo');
    jumpTo.innerHTML = secs;
    if (--secs > 0) {
        setTimeout("countDown(" + secs + ",'" + surl + "')", 1000);
    } else {
        location.href = surl;
    }
}

var timestamp = (Date.parse(new Date())) / 1000; //去当前时间戳

function judge(){
    askdata("/api/member/user/isLogin", {
        'HUILI_SESSIONID':hid
    }, "POST", function (data) {
        if(data.code == 401){
            swal({title: "", text: '请先登录'});
            setTimeout(function(){H('login.html?myGo='+hrefs())},2000);
        }
    })
}
function formatData(dataParams){
    if(dataParams!=null){
        var result = {};
        for(var key in dataParams){
            if(dataParams[key]!=null && dataParams[key]!=''&& dataParams[key]!=' '){
                result[key]=dataParams[key];
            }
        }
        return result;
    }else{
        return {};
    }
}
//  请求数据
function askdata(url, dataParams, type, callback) {
    $.ajax({
        //提交的网址
        url: baseUrl + url,
        //提交的数据
        data: formatData(dataParams),
        //提交数据的类型 POST GET
        type: type,
        //返回数据的格式
        datatype: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded',
        // xhrFields: { withCredentials: true },
        success: function (data,request) {
            callback(data,request);
            // alert(request.getResponseHeader('some_header'));
        },
        beforeSend: function () {

        },
        complete: function () {

        },
        error: function (request) {
            if(request.status == 404 || request.status == 500){
                window.location.href='not_find.html';
            }else {
                // swal({title: "", text: '系统繁忙，请稍后重试'});
                console.log('cuowu ');
            }
        }
    });
}

// 删除首尾空字符
function _trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 本地存储对象
function _storeObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
// 本地存储字符串
function _storeString(key, value) {
    localStorage.setItem(key, value);
}
// 本地存储删除
function _delStorage(key) {
    localStorage.removeItem(key);
}
// 本地存储获取对象
function _retrieveObject(key) {
    var objStr;
    objStr = localStorage.getItem(key);
    if (objStr == null)
        return null;
    return JSON.parse(objStr);
}
// 判断是否是空字符串
function _isNullString(str) {
    if (typeof(str) == 'undefined' || str == null || str == "") {
        return '--';
    } else {
        return str;
    }
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return r[2];
    return null; //返回参数值
}
function hrefs(){
    var strStr = window.location.href;
        // strStr = strStr.substring(strStr.lastIndexOf("/")+1);
    return strStr;
}
//通过url获取id值
function dealURl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");//先用正则匹配，再用字符串截取函数截取
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        //return "?" + name + "=" + r[2];
        return r[2];
    } else {
        return "";
    }
}
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//判断值是否等于undefined
function verdict(str, config) {
    if (typeof(str) == "undefined" || str == "" || str == undefined) {
        return config;
    } else {
        return str;
    }
}
//是否有效的url链接
function _isvalidUrl(url) {
    $.ajax({
        type: "GET",
        url: url,
        statusCode: {
            404: function () {
                return false;
            }
        },
        success: function () {
            return true;
        }
    });
}
//验证码倒计时
var wait = 60;
get_code_time = function (o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "重新发送";
        wait = 60;
    } else {
        o.setAttribute("disabled", "disabled");
        o.value = wait + "秒后重新获取";
        wait--;
        setTimeout(function () {
            get_code_time(o);
        }, 1000)
    }
};
// 日期字符串转换成日期
function format(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    return year + "." + month + "." + date;
}
// 日期转换成日期字符串
function formatB(now) {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + month + day;
}

/**
 *
 * @param num
 */
function isDotNumber(num) {
    return (num + '').indexOf(".") > -1;

}
//评价字数限制
function words_deal() {
    var curLength = $("#TextArea1").val().length;
    if (curLength > 50) {
        var num = $("#TextArea1").val().substr(0, 50);
        $("#TextArea1").val(num);
        alert("超过字数限制！");
    }
    else {
        $("#textCount").html($("#TextArea1").val().length);
    }
}
/*我的账户input错误提示*/
function error(error,obj,info){
    obj.find(".info").html(info);
    if(error){
        obj.siblings("input").addClass("error");
        obj.show();
    } else{
        obj.siblings("input").removeClass("error");
        obj.hide();
    }
}
/*返回401*/
function logonFailure(a){
    delCookie('userName');
    delCookie('hid');
    $('.account-pic p').html('');
    $('.topbar-item li:nth-child(1)').html('<a href="register.html">注册</a>');
    if(a == 1){
        swal({title: "", text: "请先登录"});
    }else{
        swal({title: "", text: "登录失效"});
    }
    setTimeout(function () {
        location.href = "login.html?myGo="+hrefs();
    }, 2000);
}
//    小数点的限制
function bindKeyEvent(obj){
    obj.keyup(function () {
        var reg = $(this).val().match(/\d+\.?\d{0,2}/); //保留二位小数
        var txt = '';
        if (reg != null) {
            txt = reg[0];
        }
        $(this).val(txt);
    }).change(function () {
        $(this).keypress();
        var v = $(this).val();
        if (/\.$/.test(v))
        {
            $(this).val(v.substr(0, v.length - 1));
        }
    });
}
//    验证码只能输入四位字母和数字
function checkStrLong(obj) {
    var reg = /^[a-zA-Z0-9]/g;
    var vstr = $(obj).val();
    if(!reg.test(vstr)){
        $(obj).val('');
    }else{
        if (vstr.length > 4) {
            console.log(vstr);
            vstr = vstr.substr(0, 4);
            $(obj).val(vstr);
        }
    }
}

function formatDateTime(inputTime) {  //转换为yy-mm-dd hh:mm:ss格式日期
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}
function getBeforeTime(month){   //获取前n个月前的日期
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m - month;
    m = m <= 0 ? (m + 12) : m;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}
//屏蔽输入的特殊字符
var _arr=new Array();
_arr[0]=/[\`\~\!\@\#\$\%\^\&\*\+\\\]\}\{\'\;\:\"\/\.\,\>\<\s\|\=\-\?]/g;
_arr[1]=/[^\d]/g;
function filtecharacter(obj, index) {
    obj.value = obj.value.replace(_arr[index], "");
}

/*toast*/
function toast(str,fn){
        layer.open({
            content     : str,
            shadeClose  : false,
            time        : 1,
            style       : 'top:-100px;color:#fff;background-color: rgba(0, 0, 0, 0.59);',
            end         : fn
        })
        $('.laymshade').hide();
    }

    //带一个按钮的提示框
    function layer_alert(str,fn){
        layer.open({
            title       : '提示',
            content     : str,
            shadeClose  : false,
            style       : 'width:90%;',
            btn         : ['确定'],
            end         : fn
        })
        $('.layermend').hide().siblings('h3').css({
            padding     : 0,
            border      : 0
        })
        $('.layermcont').css({color:'#fff',padding:'0 10px 20px'})
    };

    //带两个按钮的提示框
    function layer_btns(str,btn1,btn2,fn1,fn2){
        layer.open({
            title       : '提示',
            content     : str,
            shadeClose  : false,
            style       : 'width:90%;',
            btn         : [btn1,btn2],
            yes         : fn1,
            no          : fn2
        })
        $('.layermend').hide().siblings('h3').css({
            padding     : 0,
            border      : 0
        })
        $('.layermcont').css({color:'#fff',padding:'0 10px 20px'})
    }

$('#footer-bar').on('click','a',function(){
  console.log($(this).html());

   
});