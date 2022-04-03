# 初识canvas

WebGL（Web图形库）是一个JavaScript API，可在任何兼容的Web浏览器中渲染高性能的交互式3D和2D图形，而无需使用插件。WebGL通过引入一个与OpenGL ES 2.0非常一致的API来做到这一点，该API可以在HTML5 `<canvas>`元素中使用。 这种一致性使API可以利用用户设备提供的硬件图形加速。
Canvas API 提供了一个通过JavaScript 和 HTML的`<canvas>`元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API主要聚焦于 2D 图形。而同样使用`<canvas>`元素的 WebGL API 则用于绘制硬件加速的2D和3D图形。

首先我们需要创建一个 `canvas` 元素, 他只有两个属性， `width` 和 `height`，在没有设置这两个值时他们的宽高默认值是 300 和 150 。
``` html
<canvas id="my-canvas" width="400px" height="400px">
    你的浏览器不支持canvas
</canvas>
```
> 在标签中提供替换内容，当浏览器不支持 canvas 时渲染替代内容； 并且 `</canvas>` 是必须的，如果没有闭合标签会认为下面的所有内容都是替换内容。

## 渲染上下文
`canvas` 标签创建了一个画布， 并且公开了多个 **渲染上下文** ，例如 2D渲染上下文、WebGL渲染上下文等。
这里我们暂时只看 2D渲染上下文，在绘制之前我们首先要在脚本中获得 `canvas` 的渲染上下文。

这一步可以看作是，我们拿到了画笔。
```js
var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');
```
但通常会先进行一个支持性检测
```js
var canvas = document.getElementById('my-canvas');
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // 后续代码
} else {
  // 如果不支持的替代方案
}
```

## 绘制图形
画布的坐标系统如下图所示, 在画布中坐标表示为 (x, y)， 左上角为原点 (0, 0)。

![坐标示意](../../img/canvas-coordinate.png '坐标示意')

一个图形都是由不同的线段组成的，在这里我们称为一个路径，绘制一个路径的步骤：
1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去描述出路径。
3. 之后你把路径封闭，当然这是不一定的。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。1

其中基本的函数有：

1. `beginPath()`：创建一条路径
2. `moveTo(x, y)`： 将笔触移动到指定的坐标上。将笔放在画纸上的某个点
3. `closePath()`：闭合路径， 从最后一个终点闭合至最开始的起点
4. `stroke()`: 使用线条来正真的绘制出来
5. `fill()`：填充路径的内容区域来生成实心图形

> 开始绘制后一般第一步都是 `moveTo` 而后是使用函数指定绘制路径，最后是 `closePath` ，但是他不是必须的。其中，在调用 `fill` 时会自动闭合

绘制大致分为两步：
1. 第一步先是描绘路径
2. 然后再通过 `stroke` 或者 `fill` 来真正绘制出来


### 绘制直线

描绘一条直线的函数是： `lineTo(x, y)`

他以上一点或者手动指定的点为起点，指定的点为终点描绘一条直线。完成后笔触就会停留在现在的点的位置上，除非手动移动他。

例如我们可以画一个三角形。首先描绘出三角形的样子，再通过画轮廓或者填充正真的画出来。

```js
ctx.beginPath();
ctx.moveTo(150,150)
ctx.lineTo(50, 20);
ctx.lineTo(50, 100);
ctx.closePath(); // 也可 ctx.lineTo(150,150)
ctx.stroke(); // 或者使用 fill 绘制实心三角形
```

<template>
  <canvas id="my-canvas1" width="200px" height="200px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
  <canvas id="my-canvas2" width="200px" height="200px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
</template>
<script>
    const myCanvas1 = document.getElementById("my-canvas1");
    const ctx1 = myCanvas1.getContext("2d");
    const myCanvas2 = document.getElementById("my-canvas2");
    const ctx2 = myCanvas2.getContext("2d");
    ctx1.beginPath();
    ctx1.moveTo(150,150)
    ctx1.lineTo(50, 20);
    ctx1.lineTo(50, 100);
    ctx1.closePath()
    ctx1.stroke();
    ctx2.beginPath();
    ctx2.moveTo(150,150);
    ctx2.lineTo(50, 20);
    ctx2.lineTo(50, 100);
    ctx2.fill();
</script>


### 绘制曲线

一般我们使用二次贝塞尔曲线及三次贝塞尔曲线绘制曲线。

他们都需要两个点，一个起点一个终点。不同的是二次贝塞尔曲线只有一个控制点，而三次贝塞尔曲线有两个控制点。

![贝塞尔曲线](../../img/Canvas_curves.png '贝塞尔曲线')

- `quadraticCurveTo(cp1x, cp1y, x, y)`：描绘一个二次贝塞尔曲线
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`： 描绘一个三次贝塞尔曲线



### 绘制矩形

用上面的方法如果画一个矩形的画需要很多步，canvas 提供了几个方法可以直接画出矩形

1. `fillRect(x, y, width, height)`
    绘制一个填充的矩形
2. `strokeRect(x, y, width, height)`
    绘制一个矩形边框
3. `clearRect(x, y, width, height)`
    清除一个区域，让清除的部分变成透明的
4. `rect(x, y, width, height)`
    描绘一个矩形，还需要再使用函数画出来

```js
ctx.fillRect(40,40,80,40);
ctx.strokeRect(30,30,100,70);
ctx.clearRect(45,45,50,20);
```
<template>
  <canvas id="my-canvas" width="400px" height="400px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
</template>
<script>
    const myCanvas = document.getElementById("my-canvas");
    const ctx = myCanvas.getContext("2d");
    ctx.fillRect(40,40,80,40);
    ctx.strokeRect(30,30,100,70);
    ctx.clearRect(45,45,50,20);
    ctx.rect(120, 120, 50,80);
    ctx.stroke()
</script>

### 绘制圆弧

canvas也提供了绘制圆弧的方法:
- `arc(x, y, raduis, startAngle, endAngle, anticlockwise)`：描绘一个以(x, y)为圆心， radius 为半径，从 startAngle 开始到 endAngle， anticlockwise 为方向（顺时针或者逆时针）的圆弧。
> 其中角度单位为弧度，`弧度=(Math.PI/180)*角度`。anticlockwise 取值为布尔值，true是顺时针，默认为顺时针。

<template>
  <canvas id="my-canvas4" width="200px" height="200px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
</template>
<script>
    const myCanvas4 = document.getElementById("my-canvas4");
    const ctx4 = myCanvas4.getContext("2d");
    ctx4.arc(100,100,50,0,(Math.PI/180)*360, true);
    ctx4.stroke()
</script>

## Path2D对象

他可以记录一个路径以便重复使用，很大的一个用处就是用 SVG 来初始化他.
实例： 
```js
var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var p = new Path2D("M10 10 h 80 v 80 h -80 Z"); // 可以这样使用 SVG 路径初始化
    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);
    ctx.fill(circle);
  }
}
```

## 样式和颜色

### 设置颜色

在正式画出来之前我们可以设置画笔的颜色，有 
- `fillStyle = color`
- `strokeStyle = color`
分别对应 fill 的颜色和 stroke 的颜色。设置的颜色可以是 表示CS颜色值的字符串
```js
ctx.fillStyle = "red"
ctx.fillStyle = "#eeeeee"
ctx.fillStyle = "rgb(0, 255, 0)"
ctx.fillStyle = "rgba(0, 255, 0, .5)"
```

> 当设置过颜色后，之后的默认颜色就是设置的颜色了。如果需要新的颜色需要重新设置

### 设置透明度

可以通过设置 `globalAlpha` 来设置透明度。他的值为 0.0(完全透明) - 1.0(完全不透明)；
但是在平时我们设置利用设置颜色可以设置 rgba 的特性来实现透明更方便。


### 设置线条的样式
- `lineWidth = value`： 设置线条宽度
  默认值为 1.0 

- `lineCap = type`：设置线条末端样式
  值为`butt`，`round` 和 `square`。默认是 `butt`。
  - `butt`：在末端什么都不加
  - `round`：在末端会有线宽的半圆
  - `square`： 在末端会有线宽的方块

- `lineJoin = type`：设置线条结合处样式
  `round`, `bevel` 和 `miter`。默认是 `miter`
  - `miter`：两条线结合处不做处理
  - `round`：两条线结合处被磨成弧形
  - `bevel`：两条线结合处抹平

- `miterLimit = value`：限制两条线相交时交界处最大长度

- `getLineDash()`：返回一个当前虚线样式，长度为非负偶数数组
- `setLineDash(segments)`：设置当前虚线样式
  值为一个数组 [v1, v2] ， 其中 v1 为横线长度， v2 为间隔长度
- `lineDashOffset = value`：设置虚线样式偏移量
  起始的偏移量

### 渐变

先创建一个 `canvasGradient` 对象，再赋值给上下文的 `fillStyle` 或者 `strokeStyle`,
创建 `canvasGradient` 有两个方法：
-  `createLinearGradient(x1, y1, x2, y2)`：创建一个渐变的起点为 (x1, y1) 终点为 (x2, y2) 的 `canvasGradient` 对象。
-  `createRadialGradient(x1, y1, r1, x2, y2, r2)`：创建一个前三个参数和后三个参数分别组成的两个圆形的 `canvasGradient` 对象。

在创建完 `canvasGradient` 对象后，就对他们的颜色进行设置，使用他的 `addColorStop` 方法对他的颜色进行设置。

- `gradient.addColorStop(position, color)`： `position` 是一个 0.0 - 1.0的数值，他表示在渐进中的相对位置（类似百分比）。第二个参数就是颜色，接受一个css颜色值。表示在哪个位置是什么颜色的。

```js
var lineargradient = ctx.createLinearGradient(0, 0, 0, 50)
lineargradient.addColorStop(0, 'red')
lineargradient.addColorStop(1, '#fff')
ctx.fillStyle = lineargradient;
```

### 图案 Patterns

- `createPatern(image, type)`： `image` 可以是一个 Image 对象的引用， 也可以是另一个 `canvas` 对象。 `type` 的取值可以是： `repeat`、 `no-repeat`、 `repeat-y` 和 `repeat-x` 四个之一。

> 类似 `background-image`


### 阴影

- `shadowOffsetX = float`
  用来设定阴影在 x 轴的延申距离，正值表示向右，负值表示向左。
- `shadowOffsetY = float`
  用来设定阴影在 y 轴的延申距离，正值表示向下，负值表示向上。
- `shadowBlur = float`
  设定阴影的模糊程度
- `shadowColor = color`
  设定阴影的颜色

### 填充规则

当我们使用 `fill` 填充是可以选择填充规则，看一个栗子

```js
ctx.beginPath();
ctx.arc(100, 100, 10, 0, Math.PI * 2, true);
ctx.arc(100, 100, 20, 0, Math.PI * 2, true);
ctx.arc(100, 100, 30, 0, Math.PI * 2, true);
ctx.arc(100, 100, 40, 0, Math.PI * 2, true);
ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
ctx.fill("evenodd");
```

- `nonzero`
  默认值， 会填充最大的一个圆  
- `evenodd`
  填充奇数的圆环？


## 绘制文本

- `fillText(text, x, y [, maxWidth])`

- `strokeText(text, x, y [, maxWidth])`

### 文本的样式

可以通过修改一些属性来修改文本的样式
- `font = value`
  和 css 的 font  属性相同， 默认值是 `10px sans-serif`

- `testAlign = value`
  文本对齐，可选的值有：`start`、 `end`、 `left`、`right` 和 `center`

- `testBaseLine = value`
  基线设置，可选的值有：`top`、 `hanging`、 `middle`、 `alphabetic`、`ideographic` 和 `bottom`

- `direction = value`
  文本方向： 可选值有： `ltr`、 `rtl`、 `inherit`

### 获得文本的宽度

如果想要获得文本的宽度可以使用
- `measureText('text')`
  他会返回一个 `TextMetrics` 对象的宽度、所在像素等信息
  例如

```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var text = ctx.measureText("foo"); // TextMetrics object
  text.width; // 16;
}
```

## 渲染图片
