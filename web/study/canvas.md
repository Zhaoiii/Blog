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

在渲染上下文的时候我们拿到了画笔，这个时候我们要开始作图，我们应该怎么做呢？首先所有的图形都是由线段组成的，一个图形是一组线段的组合。这里我们称为一个路径。所以：
1. 首先我需要选定一个起点
2. 然后我们选择一个终点
3. 连接他们，连接时可以用直线或者弧线
4. 然后我们再从现在这个终点再画向下一个点
5. 当然中途我们可能抬起笔选择一个新的点而不是接着上一个线段的终点

以上的操作有对应的一些API
1. `beginPath()`：创建一条路径
2. `moveTo(x, y)`： 将笔触移动到指定的坐标上。将笔放在画纸上的某个点
3. `closePath()`：闭合路径， 从最后一个终点闭合至最开始的起点
4. `stroke()`: 使用线条来绘制
5. `fill()`：填充路径的内容区域来生成实心图形

### 绘制线段
想象一下画一条直线需要什么条件，大家肯定都知道需要知道起点和终点。在这里是通过 `lineTo(x, y)`, 指定线段的终点。那线段的起点在哪呢？

在开始的时候起点是在原点的，在我们画了一条线段之后，这个时候起点就变成了上一条直线的终点了。可以想象成一只画笔，在开始的时候笔是在原点的，在给了他一个终点之后他就从原点到终点画了一条线。这时笔停留在的地方就是上一条直线的要终点，此时如果我们再给他一个终点那么他将会从上一条线的终点到新的终点继续画一条线。

我们可以试着画一个三角形，他一共需要三个步骤，我们可以举个例：
1. 从原点到 (50,50)
2. 从 (50,50) 到 (50,100)
3. 再从 (50, 100) 回到原点也就是 (0, 0)
那么我们的代码就是
```js
ctx.lineTo(50, 50);
ctx.lineTo(50, 100);
ctx.lineTo(0, 0);
```

<template>
  <canvas id="my-canvas1" width="400px" height="400px" style="border: 1px solid black">
    你的浏览器不支持canvas
  </canvas>
  <script>
    const myCanvas1 = document.getElementById("my-canvas1");
    const ctx1 = myCanvas1.getContext("2d");
    ctx1.beginPath();
    ctx1.moveTo(200,200)
    ctx1.lineTo(50, 20);
    ctx1.lineTo(50, 100);
    // ctx1.closePath()
    // ctx1.stroke();
    ctx1.fill()
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