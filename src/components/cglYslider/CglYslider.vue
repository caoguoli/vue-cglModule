<template>
  <div id="Page4" :class="dataObj.disable ? 'disSlider' : ''">
    <div id="cgl-slider">
      <div class="sliver" :style="`background:${dataObj.color}`" ref="cglBox">
        <div class="circle-sliver" :style="`width:${moveLeft}%;background:${dataObj.selColor}`">
          <div class="circle flex" :style="`border-color:${dataObj.selColor}`" @touchmove="moveFn()" @touchend="endFn">
            <transition name="cgl-slider">
              <div v-show="showView" class="cirshow flex">{{value}}</div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部显示 -->
    <div v-if="dataObj.range == null"></div>
    <div v-else class="range flex-clo" :style="`color:${dataObj.range.color}`">
      <span v-for="(v,k) in dataObj.range.con">{{v}}</span>
    </div>

  </div>
</template>

<script>
export default { 
  name: "Page4",
  props:['dataObj' , 'sliderVal'],
  data() {
    return {
      moveLeft: 0,     // 默认移动距离
      disable:false,   // 禁用
      value:'50.00',   // 精确到小数点，需传字符串格式
      showView:false,  // 显示提示
    };
  },
  created: function() {
    const num = this.sliderVal;
    this.havePercentageFn(num)
  },
  watch:{
    dataObj:function(){
      const num = this.sliderVal;
      this.havePercentageFn(num)
    },
    sliderVal:function(num){
      this.havePercentageFn(num)
    }
  },
  methods: {
    haveValFn(per){     // 百分比转数字
      // 步长，最少为 1
      const step = this.dataObj.length || 1;
      const accuracy = this.haveAccuracy(step);
      // console.log('accuracy 》》》',accuracy)

      const piece = Math.floor(per * 0.01 * (this.dataObj.max - this.dataObj.min) / step);
      const num =  (this.dataObj.min + piece * step).toFixed(accuracy);
      this.value = num;
      // console.log(num)
      return num;
    },
    havePercentageFn(num){ // 数字转百分比
      this.value = num;
      const percent =  (num - this.dataObj.min) / (this.dataObj.max - this.dataObj.min) * 100;
      this.moveLeft = percent;
      return percent;
    },
    haveAccuracy(str){     // 获取精确度
      const dataStr = str.toString() || '1';
      let arr = dataStr.split('.');
      let num = 0;
      if(arr.length == 1){
        num = 0;
      }else{
        num = arr[1].length;
      }
      return num;
    },
    moveFn($event) {
      if(this.dataObj.disable){
        return;
      }
      // 显示提示
      this.showView = typeof(this.dataObj.showView) == 'undefined' ? true : this.dataObj.showView;

      const fatherWidth = this.$refs.cglBox.getBoundingClientRect().width;
      const father_minX = this.$refs.cglBox.getBoundingClientRect().left;
      const father_maxX = father_minX + fatherWidth;
      let x = event.touches[0].pageX; // 距离page 右边距离

      x = x <= father_minX ? father_minX : x;
      x = x >= father_maxX ? father_maxX : x;

      const moveLeft = ((x - father_minX) / fatherWidth) * 100;
      this.moveLeft = moveLeft;

      // 更新数据
      const num = this.haveValFn(moveLeft);

      // 防止闪跳
      this.havePercentageFn(num);

      this.$emit('fatherMove',num)
    },
    endFn(){
      const _ = this;
      const val = this.value;
      this.$emit('fatherEnd',val)
      setTimeout(function(){
        _.showView = false;
      },500)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cgl-slider-enter-active, .cgl-slider-leave-active {
  transition: opacity .5s;
}
.cgl-slider-enter, .cgl-slider-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#Page4 {
  padding: 0 .533rem;
  // border:1px solid;
  #cgl-slider {
    padding: .533rem 0;
    .sliver {
      margin: 0 auto;
      width: 90%;
      height: .16rem;
      border-radius: .267rem;
      background: gray;
      position: relative;
    }
    .circle-sliver {
      position: absolute;
      top: 0;
      left: 0;
      width: 5%;
      height:.16rem;
      background: #0082ff;
       border-radius: .267rem;
      .circle {
        width: .64rem;
        height: .64rem;
        border-radius: 50%;
        background-image: linear-gradient(0deg, #efefef 0%, #ffffff 100%);
        border: .027rem solid #0082ff;
        box-shadow: 0 .053rem .133rem 0 rgba(55, 55, 55, 0.2);
        position: absolute;
        right: -0.333rem;
        top: -0.267rem;
        z-index: 5;
        margin: 0 auto;
        .cirshow {
          // min-width: 24px;
          height: .64rem;
          border-radius: .08rem;
          position: relative;
          padding: 0 .133rem;
          background: #303133;
          color: #fff;
          font-size: .32rem;
          margin-top: -1.867rem;
          &::after {
            content: "";
            border-left: .16rem solid transparent;
            border-right: .16rem solid transparent;
            border-top: .16rem solid #303133;
            position: absolute;
            bottom: -0.16rem;
          }
        }
      }
    }
  }
  .range {
    justify-content: space-between;
    font-size: .32rem;
    color:#999;
  }
  .disSlider{
      .sliver{
        background: #ccc !important;
        .circle-sliver{
          background: #ccc !important;
          .circle{
            border-color: #ccc !important;
          }
        }
      }
      .range{
        color: #ccc !important;
      }
    }
}
</style>
