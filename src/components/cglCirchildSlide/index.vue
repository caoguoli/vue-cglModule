<template>
    <div id="Page3">
        <Headers :title="title" />
        <cgl-circhild-slide :cglSlider="cglSlider" :consistent="cglSlider.consistent" @fatherMove="fatherMoveFn" @fatherEnd="fatherEndFn" @fatherClick="fatherClickFn" />
    </div>
</template>

<script>
import Headers from '@/components/Header'
import CglCirchildSlide from '@/components/cglCirchildSlide/CglCirchildSlide'
export default {
  name: 'Page3',
  components:{ Headers, CglCirchildSlide },
  data () {
    return {
      cglSlider:{
        color:'#75D9FF',        // 主题色，非必需，默认 #2c3e50; 小 div 颜色改变，得改变图片
        title:'下一段预热时段',  // 标题：非必需，默认不显示
        subtitle:'-- --',       // 副标题：非必需，默认不显示
        sel:[0,1,3,23] ,        // 选中的div 【 0-23 】   // 非必需，默认都不选中
        consistent:true,        // 按刚滑动的div样式去渲染 ，非必需， 默认 false
      }
    }
  },
  created:function(){
    this.title = this.$route.query.title;
  },
  methods:{
    fatherMoveFn(v){
      this.ClickFn(v);
    },
    fatherEndFn(v){
      this.ClickFn(v);
    },
    fatherClickFn(v){
      this.ClickFn(v);
    },
    ClickFn(val){
      console.log('%c [success] ','color:#fff;font-weight:bold;background:green',val)
      this.countData = val;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Page3{
  width: 100%;
  height: 100vh;
  background: #fff;
}
</style>
