/**
 * 全局定义的方法
 */

import moment from 'moment';

/**
 * 1、下拉框搜索过滤
 */
global.desp_selectFilter = function(inputValue, option) {
  if(option.props.value.indexOf(inputValue) > 0) {
    return true;
  }else {
    return false;
  }
};

/**
 * 2、金额格式化
 */
global.desp_toThousands = function(sum, n) {
  n = n > 0 && n <= 20 ? n : 2;
  sum = parseFloat((sum + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = sum.split(".")[0].split("").reverse(); //整数部分，reverse()倒序输出
  var r = sum.split(".")[1]; //小数部分
  var t = "";
  var formatMoney = 0;

  //添加逗号分隔
  for(var i = 0; i < l.length; i++ ) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }

  formatMoney = t.split("").reverse().join("") + "." + r;
  //排除这种情况：-,121,212.00
  if(sum.substr(0,1) == '-' && formatMoney.substr(1,1) == ',') formatMoney = '-'+ formatMoney.substr(2,formatMoney.length-1);

  return formatMoney;
};

/**
 * 3、检查金额格式
 */
global.desp_checkAmountFormat = function(rule, value, callback) {
  //正负数(纯整数、带小数，纯小数，零)
  var reg = new RegExp("^((\-[1-9][0-9]*)|(\-[1-9][0-9]+\\.[0-9]{0,2})|(\-[0-9]+\\.[0-9]{0,2})|([1-9][0-9]*)|([1-9][0-9]+\\.[0-9]{0,2})|([0-9]+\\.[0-9]{0,2})|0)$");
  if (value && !reg.test(value)) {
    callback(new Error('请填写正确的金额格式!'));
  } else {
    callback();
  }
};

/**
 * 4、计算时间差天数，sDate1和sDate2是2006-12-18格式
 */
global.desp_dateDiffForDays = function(sDate1, sDate2){
  var aDate, oDate1, oDate2, iDays;
  aDate = sDate1.split("-");
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);//转换为12-18-2006格式
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
  return iDays;
};

/**
 * 5、计算时间差月份，sDate1和sDate2是2006-12-18格式
 */
global.desp_dateDiffForMonths = function(sDate1, sDate2){
  var lastDate = sDate1;
  var iMonths = 0;

  while(true) {

    ++iMonths;
    lastDate = moment(lastDate).add(1, 'M');

    if(moment(sDate2).isBefore(lastDate)) {

      //跨月处理结束时间天（endDay）在最近时间天（lastDay）之前的情况（加1）
      var lastDay = moment(lastDate).format('DD');
      var endDay = moment(sDate2).format('DD');

      if(endDay < lastDay) ++iMonths;

      break;
    }

  }

  return iMonths;
};

/**
 * 6、深度复制对象（array或object）
 * @param  object
 * @param  object
 * @return object
 * 在JS中json对象赋值为引用赋值，数组为copy赋值！！！
 */

//判断对象的数据类型
var desp_isClass = function(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}

global.desp_deepCopy = function (obj){
    var result;
    var oClass=desp_isClass(obj);
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(var key in obj){
       var copy=obj[key];
       if(desp_isClass(copy)=="Object"){
           result[key]=arguments.callee(copy);//递归调用
        }else if(desp_isClass(copy)=="Array"){
           result[key]=arguments.callee(copy);
        }else{
            result[key]=obj[key];
        }
    }
 return result;

}
