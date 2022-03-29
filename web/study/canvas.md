# 初识canvas

WebGL（Web图形库）是一个JavaScript API，可在任何兼容的Web浏览器中渲染高性能的交互式3D和2D图形，而无需使用插件。WebGL通过引入一个与OpenGL ES 2.0非常一致的API来做到这一点，该API可以在HTML5 `<canvas>`元素中使用。 这种一致性使API可以利用用户设备提供的硬件图形加速。
Canvas API 提供了一个通过JavaScript 和 HTML的`<canvas>`元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

Canvas API主要聚焦于2D图形。而同样使用`<canvas>`元素的 WebGL API 则用于绘制硬件加速的2D和3D图形。

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

![图片alt](../../img/canvas-coordinate.png '图片title')

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


### 绘制线段

绘制一条直线的函数是： `lineTo(x, y)`

他以上一点为起点，指定的点为起点描绘一条直线。完成后笔触就会在现在的点的位置，除非手动移动他。

例如我们可以画一个三角形

```js
ctx.beginPath();
ctx.moveTo(150,150)
ctx.lineTo(50, 20);
ctx.lineTo(50, 100);
ctx.closePath(); // 也可 ctx.lineTo(200,200)
ctx.stroke(); // 或者使用 fill 绘制实心三角形
```

<template>
  <canvas id="my-canvas1" width="200px" height="200px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
  <canvas id="my-canvas2" width="200px" height="200px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
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
</template>



### 绘制矩形

1. `fillRect(x, y, width, height)`
  绘制一个填充的矩形
2. `strokeRect(x, y, width, height)`
  绘制一个矩形边框
3. `clearRect(x, y, width, height)`
  清除一个区域，让清除的部分变成透明的

```js
ctx.fillRect(40,40,80,40);
ctx.strokeRect(30,30,100,70);
ctx.clearRect(45,45,50,20);
```
<template>
  <canvas id="my-canvas" width="400px" height="400px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
  <script>
    const myCanvas = document.getElementById("my-canvas");
    const ctx = myCanvas.getContext("2d");
    ctx.fillRect(40,40,80,40);
    ctx.strokeRect(30,30,100,70);
    ctx.clearRect(45,45,50,20);
</script>
</template>