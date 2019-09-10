<!--
 * @Description: In User Settings Edit
 * @Author: shilili1
 -->
<template lang="html">
    <div id="cgl-couter">
        <div :class="countDis ? 'shadow-box' : ''"></div>
        <div class="flex" :class="countDis ? 'cgl-coute-dis' : contentDis">
            <div class="left flex" :style='`border-color:color${color};color:${color}`' @click="childClickFn('add')">
                <i class="iconfont icon ico-left">&#xe734;</i>
            </div>
            <div class="hr" :style='`background:${color}`'></div>
            <div class="right flex":style='`border-color:color${color};color:${color}`' @click="childClickFn('less')">
                <i class="iconfont icon ico-right">&#xe608;</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Page1",
  components: {},
  data() {
    return {
        data:2,         // 值
        contentDis:'',  // 按值显示左右是否禁用
        color:'#1da7e7',
    };
  },
  props: ["countObj", "countDis" , "countData"],
  created(){
      this.haveCountData(this.countData);
  },
  watch:{
      countData:function(val){
        this.haveCountData(val);
      }
  },
  methods: {
    haveCountData(val){
        this.data = val;
        this.color = this.countObj.color || '#1da7e7';
        if(val >= this.countObj.max){
            this.contentDis = "cgl-coute-disleft";
            return;
        }else if(val <= this.countObj.min){
            this.contentDis = "cgl-coute-disright";
            return;
        }else{
            this.contentDis = "";
        }
    },
    childClickFn(val) {
        // 漂洗
        if (val == "add") {
            // 加
            if (this.data >= this.countObj.max) {
            //   this.countObj.dis = "cgl-coute-disleft";
            return;
            }
            const data = this.data + this.countObj.step;
            this.haveCountData(data);
            this.data = data;
        } else {
            // 减
            if (this.data <= this.countObj.min) {
            //   this.countObj.dis = "cgl-coute-disright";
            return;
            }
            const data = this.data - this.countObj.step;
            this.haveCountData(data);
            this.data = data;
        }
        const data = this.data;
        this.$emit('fatherDeliver',data)
    }
  }
};
</script>
<style lang="scss" scoped>
#cgl-couter {
  font-size: 200px;
  position: relative;
  .left,
  .right {
    width: 0.36em;
    height: 0.29em;
    border: 0.015em solid;
    box-sizing: border-box;
  }
  .left {
    border-top-left-radius: 0.14em;
    border-bottom-left-radius: 0.14em;
    border-right: none;
  }
  .right {
    border-top-right-radius: 0.14em;
    border-bottom-right-radius: 0.14em;
    border-left: none;
  }
  .hr {
    width: 0.015em;
    height: 0.29em;
    // background: #1da7e7;
  }
  .shadow-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  // =========== 改变的颜色
  .icon {
    // color: #1da7e7;
    font-size: 0.15em;
  }
  .cgl-coute-disleft {
    .ico-left {
      color: #999;
    }
    .left {
      border-color: #ccc;
    }
  }
  .cgl-coute-disright {
    .ico-right {
      color: #999;
    }
    .right {
      border-color: #ccc;
    }
  }
  .cgl-coute-dis {
    .icon {
      color: #ccc !important;
    }
    .left,
    .right {
      border-color: #ccc !important;
    }
    .hr {
      background: #ccc !important;
    }
  }
}
</style>