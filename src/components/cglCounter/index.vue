<template>
    <div>
        <Headers :title="title" />
        <div id="Page1" class="flex-clo">
            <p>设置值：{{countData}}</p>
            <cgl-counter :countObj="countObj" :countDis="countDis" :countData="countData" @fatherDeliver="fatherClickFn" />
        </div>
    </div>
</template>

<script>
import Headers from '@/components/Header'
import CglCounter from '@/components/cglCounter/CglCounter'
export default {
  name: 'Page1',
  components:{ CglCounter, Headers },
  data () {
    return {
        title:'',
        countObj:{
            min:0,
            max:6,
            step:1,
            color:'#75D9FF',    // 显示颜色(非必需)
        },
        countDis:false,      // 是否禁用
        countData:2          // 初始值
    }
  },
  created:function(){
    this.title = this.$route.query.title;
  },
  methods:{
      fatherClickFn(val){
        console.log('%c [success] ','color:#fff;font-weight:bold;background:green',val)
        this.countData = val;
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Page1{
    margin:0 1.333rem;
    justify-content: space-around;
}
</style>
