<template>
  <canvas class="zdog-canvas" width="240" height="240"></canvas>
</template>

<script>
  import Vue from 'vue'
  import Zdog from 'zdog'
  // import{Zdog}from 'zdog'
  export default {
    mounted(){
    //   // zdog-demo.js

      const TAU = Zdog.TAU //I like to use TAU in to set rotate values. TAU is a full rotation in radians, equal to 2 * Math.PI. So TAU/4 is a quarter-turn.

      // create illo
      let illo = new Zdog.Illustration({
        // set canvas with selector
        element: '.zdog-canvas',
        dragRotate: true,
      });

      var hemi = new Zdog.Hemisphere({
        diameter: 90,
        addTo: illo,
        color: 'white', // 表面の色
        backface: 'white', // 断面の色
        stroke: false,
        rotate: { x: TAU/4 },
      });

      var bomi = new Zdog.RoundedRect({
        width: 30, // 横
        height: 30, // たて
        cornerRadius: 50,
        addTo: hemi,
        // addTo: illo,
        // translate: { y: 6, z: 4 }, // 位置をずらす
        // rotate: { x: 1 },  // 傾き 
        color: 'white',
        fill: true,
        stroke: 60, //厚み
        // rotate: { x: -TAU/4 },
      });

      let eye = new Zdog.Ellipse({
        addTo: bomi,
        diameter: 20,
        quarters: 2,
        stroke: 7,
        translate: { x: -30, y: 20, z: 10 },
        // rotate semi-circle to point up
        rotate: { y: TAU/4 },
        color: 'black',
        // hide when front-side is facing back
        // backface: false,
      });

      eye.copy({
        translate: { x: -30, y: -20, z: 10 },
        color: 'black',
      });

      let circle = new Zdog.Ellipse({
        addTo: bomi,
        diameter: 70,
        translate: {x:10, z: 50 },
        stroke: 14,
        // rotate semi-circle to point up
        rotate: { y: 50 },
        color: '#FAF9C9',
        // hide when front-side is facing back
        // backface: false,// 後ろ側で表示する。をfalse
      });


      // update & render
      function animate() {
        // rotate illo each frame
        illo.rotate.y += 0.03;
        illo.updateRenderGraph();
        // animate next frame
        requestAnimationFrame( animate );
      }
      // start animation
      animate();
    }
  }
</script>

<style scoped>
.zdog-canvas {
  background: rgb(23, 57, 107);
}
</style>