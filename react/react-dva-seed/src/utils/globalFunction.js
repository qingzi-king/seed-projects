// 判断对象的数据类型
const ckIsClass = (o) => {
  if (o === null) return 'Null';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
}

global.ckDeepClone = (obj) => {
  var result;
  var oClass = ckIsClass(obj);

  if (oClass === 'Object'){
    result = {};
  } else if (oClass === 'Array'){
    result = [];
  } else {
    return obj;
  }

  for(var key in obj){
    var copy = obj[key];
    if (ckIsClass(copy) === 'Object'){
      result[key] = arguments.callee(copy);// 递归调用
    } else if(ckIsClass(copy) === 'Array'){
      result[key] = arguments.callee(copy);
    } else {
      result[key] = obj[key];
    }
  }

 return result;

}