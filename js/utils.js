// 寻找子元素节点 传参数就返回对应下标 不传就返回子元素集合
Element.prototype.daughterElementNode = function (index) {
  var childNodes = this.childNodes,
      len = childNodes.length,
      type = typeof(index),
      temp = [],
      item;
  for (var i = 0; i < len; i++) {
    item = childNodes[i];
    if (item.nodeType === 1) {
      temp.push(item);
    }
  }
  // 防止乱传参数的情况
  if (index !== undefined && type !== 'number') {
    return 'undefined';
  }
  // 传参数和不传参数
  if (index === undefined) {
    return temp;
  } else {
    return temp[index];
  }
}
// 示例代码：
// div.daughterElementNode(1);// 传数字几返回子元素中第几个子元素节点，不传参数返回整个子元素集合
// -------------------------------------------------------------------------------------------------------------------------------------------


// 判断父元素有没有子元素节点
Element.prototype.elemChildren = function () {
  var childNodes = this.childNodes,
      len = childNodes.length,
      item;
  for (var i = 0; i < len; i++) {
    item = childNodes[i];
    if (item.nodeType === 1) {
      return true;
    }
  }
  return false;
}
// 示例代码：
// div.elemChildren();// 父元素有子元素节点就返回true，没有就返回false
// -------------------------------------------------------------------------------------------------------------------------------------------


// 遍历父级元素下所有子元素节点
Element.prototype.traverseDaughterElement = function (node) {
  var childNodes = node.childNodes,
      len = childNodes.length,
      item;

  for (var i = 0; i < len; i++) {
    item = childNodes[i];
    if (item.nodeType === 1) {
      this.traverseDaughterElement(item);
    }
  }
  
  if (node && node.nodeType === 1) {
    return node;
  }
}
// 示例代码：
// div.traverseDaughterElement();// 返回父元素中的所有子元素
// -------------------------------------------------------------------------------------------------------------------------------------------


// 寻找元素的第N层父级元素 
Element.prototype.customParentElement = function (n) { 
  var elem = this;
  for (var i = 0; elem && i < n; i++) {
    elem = elem.parentNode;
  }
  if (n >= 0) {
    return elem;
  }
  return null;
}
// 示例代码：
// div.customParentElement(1);// 这里填数字几就返回第几个父级元素，不填参数或者填负数返回null
// -------------------------------------------------------------------------------------------------------------------------------------------


// 寻找兄弟元素节点 参数N为正找之后的第N个 参数N为负找之前的第N个 参数N为0找到自己
Element.prototype.brotherElementNode = function (n) {
  var elem = this;
  while (n) {
    if (n > 0) {
      elem = elem.nextSibling;
      while (elem && elem.nodeType !== 1) {
        elem = elem.nextSibling;
      }
      n --;
    } else if (n < 0) {
      elem = elem.previousSibling;
      while (elem && elem.nodeType !== 1) {
        elem = elem.previousSibling;
      }
      n ++;
    }
  }
  return elem;
}
// 示例代码：
// div.brotherElementNode(1); 
// 参数填正几返回之前的第几个兄弟元素，填负几返回之后第几个兄弟元素节点，不填参数返回自己，超出返回null.
// -------------------------------------------------------------------------------------------------------------------------------------------


// 子元素逆序 父元素下的子元素元素反着排 1234 变成4321
Element.prototype.childNodeReversedOrder = function () {
  var children = this.childNodes,
      len = children.length;
  
  while (len --) {
    this.appendChild(children[len]);
  }
}
// 示例代码： 
// div.childNodeReversedOrder();// 不用传参数
// -------------------------------------------------------------------------------------------------------------------------------------------


// 打印今天在一周中是星期几
Date.prototype.getWeekDay = function (lang) {
  var day = this.getDay();
  switch(day) {
    case 0:
      return lang === 'chs' ? '星期天' : 'Sunday';
      break;
    case 1:
      return lang === 'chs' ? '星期一' : 'Monday';
      break;
    case 2:
      return lang === 'chs' ? '星期二' : 'Tuesday';
      break;
    case 3:
      return lang === 'chs' ? '星期三' : 'Wednesday';
      break;
    case 4:
      return lang === 'chs' ? '星期四' : 'Thursday';
      break;
    case 5:
      return lang === 'chs' ? '星期五' : 'Friday';
      break;
    case 6:
      return lang === 'chs' ? '星期六' : 'Saturday';
      break;
    default: 
      return '输入有误'
  }
}
// 示例代码：
// var date = new Date();
// console.log(date.getWeekDay());// 不传参数按照国外的来 星期天0是第一天
// console.log(date.getWeekDay('chs'));// 传了参数chs按照中国的来 星期一是第一天
// -------------------------------------------------------------------------------------------------------------------------------------------


// 连续获取当前日期及时间 数字时钟效果 方法1
Date.prototype.getDateTime = function (elem) {
  var timer = setInterval(function () {
    var date = new Date(),
    year = date.getFullYear(),// 年 
    month = date.getMonth() + 1,// ⽉
    day = date.getDate(),// ⽇
    hours = date.getHours(),// 时 
    minutes = date.getMinutes(),// 分
    seconds = date.getSeconds();// 秒
    function setZero(num) {
      if (num < 10) {
        num = '0' + num
      }
      return num;
    }
    elem.innerHTML = year + '-'+ setZero(month) + '-' + setZero(day) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds);
  }, 1000);
}
// 示例代码：
// var span = document.getElementsByTagName('span')[0];
// new Date().getDateTime(span);
// -------------------------------------------------------------------------------------------------------------------------------------------


// 获取当前日期时间 数字时钟效果 方法2
Date.prototype.getDateTime = function () {
  var year = this.getFullYear(),
      month = this.getMonth() + 1,
      day = this.getDate(),
      hours = this.getHours(),
      minutes = this.getMinutes(),
      seconds = this.getSeconds();
  function setZero(num) {
    if (num < 10) {
      num = '0' + num
    }
    return num;
  }
  return year + '-'+ setZero(month) + '-' + setZero(day) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds);
}
// 示例代码：
// var span = document.getElementsByTagName('span')[0];
// 连续获取时间计时器效果 不加计时器就获取单次日期时间 
// var timer = setInterval(function () {
//   span.innerHTML = new Date().getDateTime();// new Date()里可以自定义时间戳
// }, 1000);
// -------------------------------------------------------------------------------------------------------------------------------------------

// 查看滚动条滚动的距离
function getScrollOffset() {
	if (window.pageXOffset) {//ie9以上及其它浏览器
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else {//ie8以及ie8以下
		return {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}
// 示例代码：
// getScrollOffset()// 获取x轴和y轴
// getScrollOffset().left 单获取x轴
// -------------------------------------------------------------------------------------------------------------------------------------------


// 查看浏览器所有内容高度，看不见的也算，元素叠加的高度
function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}
// 示例代码：
// getScrollSize()
// getScrollSize().height
// -------------------------------------------------------------------------------------------------------------------------------------------


// 查看视口/单单浏览器窗口的尺寸大小 不包括控制台 就是我们眼睛能看到的大小
function getViewportOffset() {
  if (window.innerWidth) {// ie9以上及其它浏览器
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {// ie8和ie8以下
    if (document.compatMode === 'BackCompat') {// 怪异模式
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {// 标准模式
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}
// 示例代码：
// getViewportOffset()
// getViewportOffset().width
// -------------------------------------------------------------------------------------------------------------------------------------------


// 求元素相对文档的坐标
function getElementPosition(el) {
  var parent = el.offsetParent,// 返回最近有定位的父级
      offsetLeft = el.offsetLeft,// 元素相对左边的坐标
      offsetTop = el.offsetTop;// 元素相对上边的坐标
  while (parent) {// 父级有没有
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent
  }
  return {
    left: offsetLeft,
    top: offsetTop
  }
}
// 示例代码：
// getElementPosition(div)
// getElementPosition(div).left
// -------------------------------------------------------------------------------------------------------------------------------------------


// 查询计算样式 获取元素的样式属性集合
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return parseInt(window.getComputedStyle(elem, null)[prop]);
    } else {
      return window.getComputedStyle(elem, prop);
    }
  } else {// IE独有的属性
    if (prop) {
      return parseInt(elem.currentStyle[prop]);
    } else {
      return elem.currentStyle;
    }
  }
}
// 示例代码：
// getStyles(div)// 返回集合
// getStyles(div, 'width')// 返回某元素的宽度属性值
// -------------------------------------------------------------------------------------------------------------------------------------------


// 添加事件处理函数
function addEvent(elem, type, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(type, fn, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, function () {
      fn.call(elem);
    });
  } else {
    elem['on' + type] = fn;
  }
}
// 示例代码：
// addEvent(div, 'click', function () {});
// -------------------------------------------------------------------------------------------------------------------------------------------

// 取消事件处理函数绑定
function removeEvent(elem, type, fn) {
  if (elem.addEventListener) {
    elem.removeEventListener(type, fn, false);
  } else if (elem.addachEvent) {
    elem.detachEvent('on' + type, fn);
  } else {
    elem['on' + 'type'] = null;
  }
}
// 示例代码：
// removeEvent(div, 'click', function test () {});
// -------------------------------------------------------------------------------------------------------------------------------------------

// 取消事件冒泡
function cancelBubble(e) {
  var e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}
// 示例代码：
// cancelBubble(e) 在哪里加这条代码就取消谁的冒泡
// -------------------------------------------------------------------------------------------------------------------------------------------


// 阻止默认事件行为
function cancelHandler(e) {
  var e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else { 
    e.returnValue = false;
  }
}
// 示例代码：
// cancelHandler(e) 例如阻止右键菜单在里面加这个代码就行了
// -------------------------------------------------------------------------------------------------------------------------------------------


// 鼠标位置相当于当前文档的坐标(包含滚动条距离)
function pagePos (e) {
  var sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sLeft - cLeft
  }
}
// 示例代码：
// document.onclick = function (e) {
//  var e = e || window.event;
//  console.log(pagePos(e).X);
// }
// -------------------------------------------------------------------------------------------------------------------------------------------


// 判断点是否在一个三角形内
var pointInTriangle = (function () {
  function vec(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y
    }
  }

  function vecProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
  }

  function sameSymbols(a, b) {
    return (a ^ b) >= 0;
  }

  return function (opt) {
    var PA = vec(opt.curPos, opt.lastPos),
        PB = vec(opt.curPos, opt.topLeft),
        PC = vec(opt.curPos, opt.bottomLeft),
        R1 = vecProduct(PA, PB),
        R2 = vecProduct(PB, PC),
        R3 = vecProduct(PC, PA);

    return sameSymbols(R1, R2) && sameSymbols(R2, R3);
  }
})();
// 示例代码：
// return pointInTriangle({
//   curPos: curPos, 
//   lastPos: lastPos, 
//   topLeft: TL, 
//   bottomLeft: BL
// });
// -------------------------------------------------------------------------------------------------------------------------------------------