function init () {
  initGame();
}

var initGame = (function () {
  var wrap = document.getElementsByClassName('snake-wrap')[0],
      wrapW = getStyles(wrap, 'width'),
      wrapH = getStyles(wrap, 'height'),
      t = null,
      time = 150;// 调节蛇速度

  var Snake = function () {
    this.bodyArr = [
      {x: 0, y: 0},
      {x: 0, y: 20},
      {x: 0, y: 40},
      {x: 0, y: 60},
      {x: 0, y: 80},
      {x: 0, y: 100}
    ];

    this.dir = 'DOWN';// 蛇默认方向向下
  }

  Snake.prototype = {
    init: function () {// 初始化函数
      this.bindEvent();
      this.createFood(this.bodyArr);
      this.initSnake();
      this.run();
    },

    bindEvent: function () {
      var _self = this;
      addEvent(document, 'keydown', function () {
        _self.changDir();
      });
    },

    initSnake: function () {// 初始化蛇
      var arr = this.bodyArr,
          len = arr.length,
          item,
          frag = document.createDocumentFragment();

      // 根据数组里的坐标创建i元素，添加到外层容器，如果i是蛇头那么加红色类名，不是加绿色类名。
      for (var i = 0; i < len; i++) {
        item = arr[i];

        var round = document.createElement('i');

        if (i === len - 1) {
          round.className = 'round head';
        } else {
          round.className = 'round';
        }

        round.style.left = item.x + 'px';
        round.style.top = item.y + 'px';
        frag.appendChild(round);
      }
      wrap.appendChild(frag);
    },

    move: function () {// 让蛇移动一步, 把新的坐标系整理好，然后清除原来的蛇，之后重新绘制蛇
      var arr = this.bodyArr,
          len = arr.length;

      // 头部y坐标增加了20，后面元素就跟着顺移一位
      for (var i = 0; i < len; i++) {
        if (i === len - 1) {
          // head.y += 20;
          // 根据this.dir改变头部的坐标
          this.setHeadXY(arr);
        } else {
          arr[i].x = arr[i + 1].x;
          arr[i].y = arr[i + 1].y;
        }
      }

      this.eatFood(arr);
      this.removeSnake();
      this.initSnake();
      this.headInBody(arr);
    },

    setHeadXY: function (arr) {// 设置头部, 判断边界, 从哪边出来。
      var head = arr[arr.length - 1];

      switch (this.dir) {
        case 'LEFT':
          if (head.x <= 0) {
            head.x = wrapW - 20;
          } else {
            head.x -= 20;
          }
          break;
        case 'RIGHT':
          if (head.x >= wrapW - 20) {
            head.x = 0;
          } else {
            head.x += 20;
          }
          break;
        case 'UP':
          if (head.y <= 0) {
            head.y = wrapH - 20;
          } else {
            head.y -= 20;
          }
          break;
        case 'DOWN':
          if (head.y >= wrapH - 20) {
            head.y = 0;
          } else {
            head.y += 20;
          }
          break;
        default:
          break;
      }
    },

    headInBody: function (arr) {// 让游戏结束
      var headX = arr[arr.length - 1].x,
          headY = arr[arr.length - 1].y,
          item;

      // 红色小圆点的坐标和绿色某个小圆点的坐标重合了就死了
      for (var i = 0; i < arr.length - 2; i++) {
        item = arr[i];

        if (headX === item.x && headY === item.y) {
          var _self = this;
          setTimeout(function () {
            alert('游戏结束');
            clearInterval(t);
          }, 80);
        }
      }
    },

    removeSnake: function () {// 删除全部小圆点
      var bodys = document.getElementsByClassName('round');

      while (bodys.length > 0) {
        bodys[0].remove();
      }
    },

    run: function () {// 计时器，让蛇一直动。
      var _self = this;
      t = setInterval(function () {
        _self.move();
      }, time);
    },

    changDir: function (e) {// keydown的事件处理函数
      var e = e || window.event,
          code = e.keyCode;

      this.setDir(code);
    },

    setDir: function (code) {// 设置方向键
      switch (code) {
        case 37:
          if (this.dir !== 'LEFT' && this.dir !== 'RIGHT') {
            this.dir = 'LEFT';
          }
          break;
        case 39:
          if (this.dir !== 'LEFT' && this.dir !== 'RIGHT') {
            this.dir = 'RIGHT';
          }
          break;
        case 38:
          if (this.dir !== 'UP' && this.dir !== 'DOWN') {
            this.dir = 'UP';
          }
          break;
        case 40:
          if (this.dir !== 'UP' && this.dir !== 'DOWN') {
            this.dir = 'DOWN'
          }
          break;
        default:
          break;
      }
    },

    createFood: function (arr) {// 创建食物
      var food = document.createElement('i');
      food.className = 'food';
      food.style.left = this.setRandomPos(wrapW) * 20 + 'px';
      food.style.top = this.setRandomPos(wrapH) * 20 + 'px';
      wrap.appendChild(food);
    },

    setRandomPos: function (size) {// 设置随机数
      return Math.floor(Math.random() * (size / 20));
    },

    eatFood: function (arr) {// 吃食物
      var food = document.getElementsByClassName('food')[0],
          foodX = getStyles(food, 'left'),
          foodY = getStyles(food, 'top'),
          headX = arr[arr.length - 1].x,
          headY = arr[arr.length - 1].y,
          x,
          y;

          this.excludeBody(arr);

      if (headX === foodX && headY === foodY) {
        this.removeFood(food);
        this.createFood();

        if (arr[0].x === arr[1].x) {// 上下
          x = arr[0].x;

          if (arr[0].y > arr[1].y) {// 往上走
            y = arr[0].y + 20;
          } else if (arr[0].y < arr[1].y) {// 往下走
            y = arr[0].y - 20;
          }
        } else if (arr[0].y === arr[1].y) {// 左右
          y = arr[0].y;
          if (arr[0].x > arr[1].x) {// 往左走
            x = arr[0].x + 20;
          } else if (arr[0].x < arr[1].x) {// 往右走
            x = arr[0].x - 20;
          }
        }

        arr.unshift({x, y});
      }
    },

    removeFood: function (food) {// 删除食物
      food.remove();
    },

    excludeBody: function (arr) {// 食物在蛇身体里
      var food = document.getElementsByClassName('food')[0],
          item,
          foodX = getStyles(food, 'left'),
          foodY = getStyles(food, 'top');

      for (var i = 0; i < arr.length - 2; i++) {
        item = arr[i];
        if (item.x === foodX && item.y === foodY) {
          console.log(1)
          this.removeFood(food);
          this.createFood();
        }
      }
    }
  }

  return new Snake().init();
});
