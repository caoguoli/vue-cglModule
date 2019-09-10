<template>
    <div id="Page4">
        <Headers :title="title" />
        <cgl-yslider :dataObj="dataObj" :sliderVal="sliderVal" @fatherMove="fatherMoveFn" @fatherEnd="fatherEndFn" />
    </div>
</template>

<script>
import Headers from '@/components/Header'
import CglYslider from '@/components/cglYslider/CglYslider'
export default {
  name: 'Page4',
  components:{ Headers, CglYslider},
  data () {
    return {
      dataObj:{
        min:0,
        max:100,
        length:'10.00',         // 步长，包括显示精确度 （非必需，默认 1）
        range:{                 // 底部展示 （非必需，默认不显示）
          // color:'#75D9FF',   //（非必需）
          con: ['0℃','100℃'],
        },  
        // showView:true,         // 滑动显示当前的值 （非必需,默认显示）
        // selColor:'#75D9FF',    // 选中颜色
        // color:'#999',          // 滑动条颜色
        disable:false,            // 禁用
      },
      sliderVal:'0.00'
    }
  },
  created:function(){
    this.title = this.$route.query.title;
  },
  methods:{
      fatherMoveFn(data){  // 移动
        this.fatherClickFn(data)
      },
      fatherEndFn(data){   // 结束移动
        this.fatherClickFn(data)
      },
      fatherClickFn(val){
        console.log('%c [success] ','color:#fff;font-weight:bold;background:green',val)
        this.countData = val;
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
