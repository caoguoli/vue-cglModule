<template>
    <div>
        <Headers :title="title" />
        <cgl-movedel :fatherViewData="fatherViewData" :styles="styles" @fatherDel="fatherDelFn" />
    </div>
</template>

<script>
import Headers from '@/components/Header'
import CglMovedel from '@/components/cglMovedel/CglMovedel'
export default {
  name: 'Page5',
  components:{ Headers, CglMovedel },
  data () {
    return {
        fatherViewData:[   // 列表：非必需
            {title:'预约一','des':'删除',moveLeft:false}, //  分别表示：标题、右边的标题、移动到最左边、都必需
            {title:'预约二','des':'删除',moveLeft:false},
            {title:'预约三','des':'删除',moveLeft:false},
            {title:'预约四','des':'删除',moveLeft:false},
        ],
        styles:{      // 都是非必需
            // titleColor:'#999',
            // rightBg:'red',
            // rightColor:'#fff'
        }
    }
  },
  created:function(){
    this.title = this.$route.query.title;
  },
  methods:{
      fatherDelFn(v){
        this.fatherClickFn(v);
        console.log('+++++',this.fatherViewData)
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
#Page1{
    margin:0 1.333rem;
    justify-content: space-around;
}
</style>
