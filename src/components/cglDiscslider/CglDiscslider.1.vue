<template>
    <div id="CglDiscslider">
      <div class="canvas-box">
        <canvas id="canvas" width="250" height="250" style="width:250;height:250" 
          @touchstart.prevent="canvasStart($event)"
          @touchmove.prevent="canvasMove($event)"
          @touchend.prevent="canvasEndFn($event)"
        ></canvas>
      </div>
    </div>
</template>

<script>
import fun from '@/components/cglDiscslider/fun.js';
export default {
  name: 'CglDiscslider',
  props:['selWindstate' , 'disable' , 'cirObj'],
  data () {
    return {
      canvasData:{},
      lastCanvasWind:-1,  // 确保滑动到 最小到最大的小圆弧时，不执行 touchend 事件

      // selWindstate: max,   // 初始值
      // disable: false,     // 禁用
      // disableCir:true,    // 禁用圆球
      // cirObj:{
      //   min:35,
      //   max:max,
      // }
    }
  },
  mounted(){
    const selWindstate = this.selWindstate;
    const min = this.cirObj.min;
    const max = this.cirObj.max;
    const disableCir = this.cirObj.disableCir;
    const disable = this.disable;
    
    let canvasObj = fun.getCanvas(min, max, selWindstate, selWindstate, disable, disableCir);
    for (const key in canvasObj) {
      this.canvasData[key] = canvasObj[key];
    }
  },
  methods:{
    canvasStart(){
      this.funData();
      // if(this.disable || this.cirObj.disableCir){
      //   return;
      // }

      // let pan_R = this.canvasData.r;
      // let pan_Width = this.canvasData.cirWidth;
      // let pan_X = this.canvasData.canvas_X / 2;
      // let pan_Y = this.canvasData.canvas_Y / 2;
      // const min = this.cirObj.min;
      // const max = this.cirObj.max;

      // let x = event.touches[0].pageX - canvas.getBoundingClientRect().left;
      // let y = event.touches[0].pageY - canvas.getBoundingClientRect().top;

      // let move_RR =  Math.pow(x - pan_X,2)  + Math.pow( y - pan_Y,2);
      // let move_R = Math.sqrt(move_RR);


      // let move_num = null;
      // if (Math.abs(Math.abs(move_R - pan_R) - pan_Width) < 15) { // 在圆盘上滑动
      //   // console.log("在圆盘内滑动 --")/

      //   let sinVal = (pan_X - x) / move_R;
      //   let angle = Math.acos(sinVal) * 180 / Math.PI;

      //   if (angle <= 90 && pan_Y < y) {
      //       angle = angle * (-1);
      //   }

      //   if (angle <= 180 && angle >= 90 && pan_Y < y) {
      //       angle = 180 + (180 - angle);
      //   }

      //   // console.log('获取角度 ==========>',angle)
      //   if (angle < - 45 || angle > 225) {
      //       return;
      //   }
      //   move_num = (max - min) / (225 - (-45)) * (angle + 45) + min;
      //   if (move_num > 52) {
      //       move_num = Math.ceil(move_num);
      //       if (move_num >= max) {
      //           move_num = max;
      //       }
      //   }
      //   if (move_num <= 52) {
      //       move_num = Math.floor(move_num);
      //       if (move_num <= min) {
      //           move_num = min;
      //       }
      //   }

      //   // console.log('获取温度 ==========>',move_num)

      //   let disable = this.disable;
      //   let selWindstate = this.selWindstate;
      //   let canvasObj = fun.getCanvas(min, max, move_num, move_num, disable, false);
      //   for (const key in canvasObj) {
      //       this.canvasData[key] = canvasObj[key];
      //   }
      //   this.newCanvasWidth = move_num;
      // }
    },
    canvasMove(){
      this.funData();
      // if(this.disable || this.cirObj.disableCir){
      //   return;
      // }

      // let pan_R = this.canvasData.r;
      // let pan_Width = this.canvasData.cirWidth;
      // let pan_X = this.canvasData.canvas_X / 2;
      // let pan_Y = this.canvasData.canvas_Y / 2;
      // const min = this.cirObj.min;
      // const max = this.cirObj.max;

      // let x = event.touches[0].pageX - canvas.getBoundingClientRect().left;
      // let y = event.touches[0].pageY - canvas.getBoundingClientRect().top;

      // let move_RR =  Math.pow(x - pan_X,2)  + Math.pow( y - pan_Y,2);
      // let move_R = Math.sqrt(move_RR);

      // let move_num = null;
      // if (Math.abs(Math.abs(move_R - pan_R) - pan_Width) < 15) { // 在圆盘上滑动
      //   // console.log("在圆盘内滑动 --")/

      //   let sinVal = (pan_X - x) / move_R;
      //   let angle = Math.acos(sinVal) * 180 / Math.PI;

      //   if (angle <= 90 && pan_Y < y) {
      //       angle = angle * (-1);
      //   }

      //   if (angle <= 180 && angle >= 90 && pan_Y < y) {
      //       angle = 180 + (180 - angle);
      //   }

      //   // console.log('获取角度 ==========>',angle)
      //   if (angle < - 45 || angle > 225) {
      //       return;
      //   }
      //   move_num = (max - min) / (225 - (-45)) * (angle + 45) + min;
      //   if (move_num > 52) {
      //       move_num = Math.ceil(move_num);
      //       if (move_num >= max) {
      //           move_num = max;
      //       }
      //   }
      //   if (move_num <= 52) {
      //       move_num = Math.floor(move_num);
      //       if (move_num <= min) {
      //           move_num = min;
      //       }
      //   }

      //   console.log('【温度设置 move】',this.newCanvasWidth)
        

      //   let disable = this.disable;
      //   let selWindstate = this.selWindstate;
      //   let canvasObj = fun.getCanvas(min, max, move_num, move_num, disable, false);

      //   this.newCanvasWidth = move_num;
      //   for (const key in canvasObj) {
      //       this.canvasData[key] = canvasObj[key];
      //   }
      // }
    },
    funData:function(){

      if(this.disable || this.cirObj.disableCir){
        return;
      }

      let pan_R = this.canvasData.r;
      let pan_Width = this.canvasData.cirWidth;
      let pan_X = this.canvasData.canvas_X / 2;
      let pan_Y = this.canvasData.canvas_Y / 2;
      const min = this.cirObj.min;
      const max = this.cirObj.max;

      let x = event.touches[0].pageX - canvas.getBoundingClientRect().left;
      let y = event.touches[0].pageY - canvas.getBoundingClientRect().top;

      let move_RR =  Math.pow(x - pan_X,2)  + Math.pow( y - pan_Y,2);
      let move_R = Math.sqrt(move_RR);

      let move_num = null;
      if (Math.abs(Math.abs(move_R - pan_R) - pan_Width) < 15) { // 在圆盘上滑动
        // console.log("在圆盘内滑动 --")/

        let sinVal = (pan_X - x) / move_R;
        let angle = Math.acos(sinVal) * 180 / Math.PI;

        if (angle <= 90 && pan_Y < y) {
            angle = angle * (-1);
        }

        if (angle <= 180 && angle >= 90 && pan_Y < y) {
            angle = 180 + (180 - angle);
        }

        // console.log('获取角度 ==========>',angle)
        if (angle < - 45 || angle > 225) {
            return;
        }
        move_num = (max - min) / (225 - (-45)) * (angle + 45) + min;
        if (move_num > 52) {
            move_num = Math.ceil(move_num);
            if (move_num >= max) {
                move_num = max;
            }
        }
        if (move_num <= 52) {
            move_num = Math.floor(move_num);
            if (move_num <= min) {
                move_num = min;
            }
        }

        console.log('【温度设置 move】',this.newCanvasWidth)
        

        let disable = this.disable;
        let selWindstate = this.selWindstate;
        let canvasObj = fun.getCanvas(min, max, move_num, move_num, disable, false);

        this.newCanvasWidth = move_num;
        for (const key in canvasObj) {
            this.canvasData[key] = canvasObj[key];
        }
      }
    },
    canvasEndFn(){
      const min = this.cirObj.min;
      const max = this.cirObj.max;

      if(this.disable || this.cirObj.disableCir){
        return;
      }

      if(this.lastCanvasWind == this.newCanvasWidth && this.newCanvasWidth == max){
        return;
      }
       if(this.lastCanvasWind == this.newCanvasWidth && this.newCanvasWidth == min){
        return;
      }
      this.lastCanvasWind = this.newCanvasWidth;
      console.log('【温度设置 end】',this.newCanvasWidth)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#CglDiscslider{
  margin:0 auto;
} 

</style>
