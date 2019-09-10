<template>
    <div>
        <Headers :title="title"  />
        <div id="Page2" class="flex-clo" :class="disable ? 'bgoff' : 'bgon'">
           <cgl-discslider :selWindstate="selWindstate" :disable="disable" :cirObj="cirObj" @cglmove="cglmoveFn" @cglend="cglendFn" />
        </div>
    </div>
</template>

<script>
import Headers from '@/components/Header'
import CglDiscslider from '@/components/cglDiscslider/CglDiscslider'
export default {
  name: 'Page2',
  components:{ Headers , CglDiscslider },
  data () {
    return {
        selWindstate: 100,   // 初始值
        disable: false,      // 禁用
        cirObj:{
            min:20,
            max:100,
            color:'#fff',
            disableCir:false,    // 禁用圆球
            title:'设置温度'
        }
    }
  },
  created:function(){
    this.title = this.$route.query.title;
  },
  methods:{
    cglmoveFn(val){
        this.fatherClickFn(val);
    },
    cglendFn(val){
        this.fatherClickFn(val);
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
#Page2{
    width: 100%;
    
}
.bgon{
    background-image:linear-gradient(-1deg, #00c2ff 0%, #0082ff 100%);
}
.bgoff{
    background:rgb(216, 221, 232);
}
</style>
