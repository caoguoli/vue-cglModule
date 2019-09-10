<template>
  <div class="sel-hourBox flex-row">
    <div class="hour-box">
      <div class="yuan yuan1 flex" :style='`border-color:${cglSlider.color};`'>
        <div class="yuan yuan2" :style='`border-color:${cglSlider.color};`'></div>
      </div>
      <div class="hour-click" ref='cglBox'  @touchmove.prevent="cirFatherMoveFn($event)" @touchend="cirFatherEndFn">
        <div class="cir1" :class="selWeekData['13'] == 1 ? 'sel' : ''" @click="hoursClick(13)">13</div>
        <div class="cir2" :class="selWeekData['14'] == 1 ? 'sel' : ''" @click="hoursClick(14)">14</div>
        <div class="cir3" :class="selWeekData['15'] == 1 ? 'sel' : ''" @click="hoursClick(15)">15</div>
        <div class="cir4" :class="selWeekData['16'] == 1 ? 'sel' : ''" @click="hoursClick(16)">16</div>
        <div class="cir5" :class="selWeekData['17'] == 1 ? 'sel' : ''" @click="hoursClick(17)">17</div>
        <div class="cir6" :class="selWeekData['18'] == 1 ? 'sel' : ''" @click="hoursClick(18)">18</div>
        <div class="cir7" :class="selWeekData['19'] == 1 ? 'sel' : ''" @click="hoursClick(19)">19</div>
        <div class="cir8" :class="selWeekData['20'] == 1 ? 'sel' : ''" @click="hoursClick(20)">20</div>
        <div class="cir9" :class="selWeekData['21'] == 1 ? 'sel' : ''" @click="hoursClick(21)">21</div> 
        <div class="cir10" :class="selWeekData['22'] == 1 ? 'sel' : ''" @click="hoursClick(22)">22</div>
        <div class="cir11" :class="selWeekData['23'] == 1 ? 'sel' : ''" @click="hoursClick(23)">23</div>
        <div class="cir12" :class="selWeekData['0'] == 1 ? 'sel' : ''" @click="hoursClick(0)">0</div>
        <div class="cir13" :class="selWeekData['1'] == 1 ? 'sel' : ''" @click="hoursClick(1)">1</div>
        <div class="cir14" :class="selWeekData['2'] == 1 ? 'sel' : ''" @click="hoursClick(2)">2</div>
        <div class="cir15" :class="selWeekData['3'] == 1 ? 'sel' : ''" @click="hoursClick(3)">3</div>
        <div class="cir16" :class="selWeekData['4'] == 1 ? 'sel' : ''" @click="hoursClick(4)">4</div>
        <div class="cir17" :class="selWeekData['5'] == 1 ? 'sel' : ''" @click="hoursClick(5)">5</div>
        <div class="cir18" :class="selWeekData['6'] == 1 ? 'sel' : ''" @click="hoursClick(6)">6</div>
        <div class="cir19" :class="selWeekData['7'] == 1 ? 'sel' : ''" @click="hoursClick(7)">7</div>
        <div class="cir20" :class="selWeekData['8'] == 1 ? 'sel' : ''" @click="hoursClick(8)">8</div>
        <div class="cir21" :class="selWeekData['9'] == 1 ? 'sel' : ''" @click="hoursClick(9)">9</div>
        <div class="cir22" :class="selWeekData['10'] == 1 ? 'sel' : ''" @click="hoursClick(10)">10</div>
        <div class="cir23" :class="selWeekData['11'] == 1 ? 'sel' : ''" @click="hoursClick(11)">11</div>
        <div class="cir24" :class="selWeekData['12'] == 1 ? 'sel' : ''" @click="hoursClick(12)">12</div>
      </div>
      
      <div class="times flex" :style='`color:${cglSlider.color}`'>
        <i class="iconfont icon">&#xe72a;</i>
        <div class="con flex">
          <p>{{cglSlider.title}}</p>
          <p>{{cglSlider.subtitle}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['cglSlider', 'consistent'],
  data() {
    return {
      selWeekData :{ '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0 },

      cirDivXy:{},          // 各小div坐标
      cirRadus:0,           // 小div 半径
      huadongCirIndex:0,    // 滑动时，防止回跳
      consistentMove:false, // 滑动开始计算
      consistentMoveIndex:0,// 滑动开始，当前 小div 状态

      clickDiv:false,
    };
  },
  created: function() {
    this.title = this.$route.query.title;
    this.firstViewFn();
  },
  mounted:function(){
    this.$nextTick(function () {
      this.getChildXYFn();
    })
  },
  watch:{
    cglSlider:function(){
      this.firstViewFn();
    }
  },
  methods: {
    firstViewFn(){ // 更新显示
      const selVal = this.cglSlider.sel || [];
      let selWeekData = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0 };
      selVal.forEach(ele => {
        selWeekData[ele] = 1;
      });
      this.selWeekData = selWeekData;
    },
    getChildXYFn(){     // 获取初始坐标
      const _ = this;
      const fatherDemo = (this.$refs.cglBox).children;
      for(let i=0;i<fatherDemo.length;i++){
        let indexDemo = fatherDemo[i];

        let indeDomIndex = indexDemo.innerHTML;
        let indexXY = indexDemo.getBoundingClientRect();
        let cirX = (indexXY.right - indexXY.left) / 2 + indexXY.left;
        let cirY = (indexXY.bottom - indexXY.top) / 2 + indexXY.top;
        _.cirDivXy[indeDomIndex] = {cirX, cirY};
      }
      _.cirRadus = fatherDemo[11].getBoundingClientRect().width/2;
    },
    changeSqlTypeFn(data){  
      let val = [];
      for (const key in data) {
        if(data[key] == 1){
          val.push(key);
        }
      }
      return val;
    },
    cirFatherMoveFn(e){  // 滑动
      let pageX = e.touches[0].pageX;
      let pageY = e.touches[0].pageY;
      let cirRadus = this.cirRadus;

      let nowMoveIndex = -1;
      let cirDivXyObj = this.cirDivXy;
      // 获取当前滑动的 小DIV 下标
      for (const key in cirDivXyObj) {
        let cirIndex = cirDivXyObj[key];
        let x = cirIndex['cirX'] - pageX;
        let y = cirIndex['cirY'] - pageY;
        if(x * x + y * y < cirRadus * cirRadus){
          nowMoveIndex = key;
          break;
        }
      }
      /** 
       * 在一个div 内持续滑动，防止回跳
       * 若开始进入 父级div，movestart 瞬间无与小div 相对的，则不展示 【防止 selWeekData 中出现 -1 键】
      **/
      if(this.huadongCirIndex == nowMoveIndex || nowMoveIndex == -1){
        return;
      }
      this.huadongCirIndex = nowMoveIndex;
      // 展示逻辑
      let data = this.selWeekData;
      if(this.consistent){ // ================================= 按初次点击到的 小div 状态 展示 
       
        let consistentMoveIndex =  this.consistentMoveIndex;
        if(!this.consistentMove){ // 刚开始滑，获取当前 小div 状态
          this.consistentMove = true;
          consistentMoveIndex = data[nowMoveIndex];
          this.consistentMoveIndex = consistentMoveIndex;
        }
        data[nowMoveIndex] = consistentMoveIndex;
      }else{    // ================== 按 正、反展示

        if(data[nowMoveIndex] != 1){ 
          data[nowMoveIndex] = 1;
        }else{
          data[nowMoveIndex] = 0;
        }
      }
      this.selWeekData = data;
      // 反馈给父级
      const sqlVal = this.changeSqlTypeFn(data);
      this.$emit('fatherMove',sqlVal);
    },
    cirFatherEndFn(){    // 结束滑动
      const _ = this;
      // 从头开始渲染
      this.consistentMove = false;
      /**
       * 反馈给父级
       * 解决先执行 move 后 click ，导致的获取数据为上次值不正常的现象
      **/
      setTimeout(()=>{
        const sqlVal = this.changeSqlTypeFn(this.selWeekData);
        _.$emit('fatherEnd',sqlVal);
      },100)
    },
    hoursClick(data){   // 点击
      this.clickDiv = true;
      const index = data.toString();
      const val = this.selWeekData[index] == 1 ? 0 : 1;
      let selWeekData = this.selWeekData;
      this.selWeekData[index] = val;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hour-box{
  position: relative;
  .yuan1{
    width:8.48rem;
    height: 8.48rem;
  }
  .yuan2{
    width: 8rem;
    height: 8rem;
  }
  .yuan{
    border-radius: 50%;
    border:.027rem solid;
  }
  .hour-click{
    width: 7.467rem;
    height:7.467rem;
    border-radius: 50%;
    position: absolute;
    top:.507rem;
    left:.507rem;
    border:.027rem solid transparent;
    z-index: 5;
    div{
      width: .88rem;
      height:.88rem;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      background: url(../../assets/imgs/sq11.png) center center no-repeat;
      background-size: 100%;
      margin:-0.44rem 0 0 -0.44rem;
      color: transparent;
      opacity: 0.22;
    }
    @for $i from 1 through 24{
      .cir#{$i}{
        transform: rotate($i*15deg) translateY(3.467rem);
      }
    }
    .sel{
      opacity: 1;
    }
  }
  .times{
    width: 5.6rem;
    height: 5.6rem;
    position: absolute;
    top:1.44rem;left:1.44rem;
    i{
      font-size: 5.333rem;
    }
    .con{
      width: 5.6rem;
      height: 5.6rem;
      background-size: 5.6rem 5.6rem;
      flex-direction: column;
      text-align: center;
      position: absolute;
      left:0;top:0;
      p{
        font-size:.48rem;
      }
    }
  }
}
</style>
