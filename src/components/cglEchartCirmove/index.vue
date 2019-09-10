<template>
    <div>
        <Headers :title="title" />
        <div id="Page1" class="flex-clo">
            <cgl-echart-cirmove :viewData="viewData" :fatherVal="val"  @fatherMove="fatherMoveFn" @fatherEnd="fatherEndFn" @fatherClick="fatherClickFn" />
        </div>
    </div>
</template>

<script>
import Headers from '@/components/Header'
import CglEchartCirmove from '@/components/cglEchartCirmove/CglEchartCirmove'
export default {
  name: 'Page6',
  components:{Headers, CglEchartCirmove},
  data () {
    return {
      viewData:{
        fange:[20,60],          // 范围
        // splitNumber:6,       // 分隔份数
        // color:"#dbdbdb",
        // selColor:'#5CBB9D'
        // step:2,
        // disable:false,
        // titleColor: '#333' , // 标题颜色
        // unit:'%'
      },
      val:50,                   // 当前值
    }
  },
  created:function(){
    this.title = this.$route.query.title;
  },
  methods:{
    fatherMoveFn(v){
      this.logFn(v);
    },
    fatherEndFn(v){
      this.logFn(v);
    },
    fatherClickFn(v){
      this.logFn(v);
    },
    // ================
    logFn(val){
      console.log('%c [success] ','color:#fff;font-weight:bold;background:green',val)
      this.countData = val;
    },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
