<template>
  <canvas id="my-canvas" width="400px" height="400px">
    你的浏览器不支持canvas
  </canvas>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const myCanvas = document.getElementById("my-canvas");
    const ctx = myCanvas.getContext("2d");
    ctx.beginPath(); // 开始路径绘制
    ctx.moveTo(200, 20); // 设置路径起点，坐标为(20,20)
    ctx.lineTo(300, 120); // 绘制一条到(200,20)的直线
    ctx.lineTo(100, 120); // 绘制一条到(200,20)的直线
    ctx.closePath(); // 绘制一条到(200,20)的直线
    ctx.lineWidth = 1.0; // 设置线宽
    ctx.strokeStyle = "#CC0000"; // 设置线的颜色
    ctx.stroke(); // 进行线的着色，这时整条线才变得可见
  },
};
</script>