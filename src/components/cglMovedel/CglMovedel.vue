<!--
 * @Description: In User Settings Edit
 * @Author: shilili1
 -->
<template lang="html">
    <div id="cgl-Weeksel">
        <div class="cgl-Weeksel" v-for="(v,k) in viewData">
            <div class="weeksel" :class="v.moveLeft ? 'moveLeft' : ''" @touchstart="startMoveFn($event,k)" @touchend="endMoveFn($event,k)">
                <div class="box flex-clo" :style="`color:${defaultStyle.titleColor}`">{{v.title}}</div>
                <div class="del flex" :style="`background:${defaultStyle.rightBg};color:${defaultStyle.rightColor}`" @click="delViewFn(k)">{{v.des}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "CglWeeksel",
  components: {},
  data() {
    return {
        viewData:[],
        defaultStyle:{
            titleColor:'#999',
            rightBg:'crimson',
            rightColor:'#fff'
        }
    };
  },
  props: ['fatherViewData', 'styles'],
  created() {
    this.firstRenderViewFn();
    this.viewData = this.fatherViewData || [];
  },
  watch: {
      fatherViewData:function(v){
        this.viewData = v || [];
      },
      styles:function(v){
        this.firstRenderViewFn();
      }
  },
  methods: {
    firstRenderViewFn(){
        const styles = this.styles;
        if(styles != null){
            this.defaultStyle.titleColor = styles.titleColor || this.defaultStyle.titleColor;
            this.defaultStyle.rightBg = styles.rightBg || this.defaultStyle.rightBg;
            this.defaultStyle.rightColor = styles.rightColor || this.defaultStyle.rightColor;
        }
    },
    startMoveFn(v, k){
        // console.log(v,k)
        const x = v.changedTouches[0].pageX;
        this.viewData[k].startX = parseInt(x);
    },
    endMoveFn(v, k){
        const x = v.changedTouches[0].pageX;
        const x2 = parseInt(x);
        const x1 = this.viewData[k].startX;
        let moveLeft;
        if(x1 - x2 > 10){
            moveLeft = true;
        }else if(x2 - x1 > 10){
            moveLeft = false;
        }
        // 如果是点击事件，则返回
        if(moveLeft == null){
            return;
        }
        let viewData = this.viewData;
        this.viewData[k].moveLeft = moveLeft;
        this.viewData[k].startX = 0;
        this.viewData = viewData;
    },
    delViewFn(k){
        let viewData = this.viewData;
        const returnObj = {
            index:k,
            del: viewData[k]
        }
        this.viewData.splice(k, 1);
        this.$emit('fatherDel',returnObj);
    }
  }
};
</script>
<style lang="scss" scoped>
.cgl-Weeksel{
    overflow: hidden;
    height: 1.4rem;
    position: relative;
    margin-bottom:.04rem;
    .weeksel{
        width: calc(100vw + 1.5rem);
        display: inline-block;
        background: black;
        position: absolute;
        right: -1.5rem;
        top: 0;
        transition: all .3s;
        .box{
            float: left;
            width: 100vw;
            height: 1.4rem;
            text-indent: 2em;
            background: #fff;
        }
        .del{
            float: left;
            width: 1.5rem;
            height: 1.4rem;
            background: pink;
        }
    }
    .moveLeft{
        right: 0;
        transition: all .3s;
    }
}
</style>