import dictionary from './dictionary.js'
import addressArr from './address'
const dateFormat = function(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 金额格式化
 * @param {*} s
 * @param {*} n
 */
function currencyFormat(value, n) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  if (isNaN(Number(value))) return '';
  n = n > 0 && n <= 20 ? n : 2;
  // eslint-disable-next-line
  value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  const l = value.split('.')[0];
  const r = value.split('.')[1];
  return '\u00a5' + l + '.' + r;
}


/**
 * 获取字典数组或字典对应label
 * @param {*} value
 * @param {*} name
 */
function searchDictionary(value, name) {
  if (arguments.length === 1) return dictionary[value].options || []; //  如果参数只有一个，获取对应的arr
  if (!dictionary[name]) return
  const arr = dictionary[name].options || [];
  let result = ''
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value == value) {
      result = arr[i].label
      break
    }
  }
  return result;
}

/**
 * 自定义数组字典，获取label
 * @param {*} value
 * @param {*} arr
 */
function seeLabel(value, arr) {
  if (!arr) return '';
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].itemCode === value) {
      result = arr[i].itemName;
      break;
    }
  }
  return result;
}

/**
 * 判断数据类型
 * @param {*} dataType
 */
function typeOf(dataType) {
  return Object.prototype.toString.call(dataType).slice(8, -1).toLowerCase()
}

/**
 * 对象深拷贝
 * @param {*} data
 */
function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 删除 参数对象中为空的属性
 * @param {*} data
 */
function removeEmptyProp(data) {
  var o = deepCopy(data);
  for (var k in o) {
    if (typeOf(o[k]) === 'string') {
      o[k] = o[k].trim()
      if (!o[k]) {
        delete o[k];
      }
    } else if (typeOf(o[k]) === 'object') {
      removeEmptyProp(o[k])
    }
  }
  return o
}

/**
 * 获取地区 code 数组
 * @param {*} childCode
 */
function getAreaCodeArr(childCode) {
  if (!childCode) return;
  const arr = [];
  const len = addressArr.length
  for (var i = 0; i < len; i++) {
    var parent = addressArr[i];
    var children = parent.children;
    if (children) {
      const len = children.length
      for (var j = 0; j < len; j++) {
        if (children[j].value === childCode) {
          arr.push(children[j].parentCode);
          break;
        }
      }
      if (arr.length) {
        arr.push(childCode);
        break;
      }
    }
  }
  return arr;
}

/**
 * 获取地区信息
 * @param {*} childCode
 */
function getAreaInfo(childCode) {
  const length = addressArr.length
  let str = '';
  for (var i = 0; i < length; i++) {
    var parent = addressArr[i];
    var children = parent.children;
    if (children) {
      const len = children.length
      for (var j = 0; j < len; j++) {
        if (children[j].value === childCode) {
          str = parent.label + children[j].label
          return str
        }
      }
    } else if (parent.value === childCode) {
      str = parent.label
      return str
    }
  }
  return str;
}


export {
  dateFormat,
  currencyFormat,
  searchDictionary,
  removeEmptyProp
}
