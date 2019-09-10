<template>
  <div id="Index">
    <h2>组件列表</h2>
    <ul class="">
      <li v-for="(v,k) in list">
        <router-link tag="div" :to="{path:v.path,query:{title:v.title}}"  class="flex-clo">{{v.title}} <i class="iconfont icon">&#xe723;</i></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      list:[
        {title:'加减按钮组件',path:'cglcounter'},
        {title:'圆盘滑动条组件',path:'cglDiscslider'},
        {title:'圆圈内部小div手指移动选中组件',path:'CglCirchildSlide'},
        {title:'Y轴滑动条组件',path:'cglYslider'},
        {title:'滑动删除组件',path:'cglMovedel'},
        {title:'Echart 圆形表盘组件',path:'cglEchartCirmove'},        
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Index{
  margin-top: 10px;
  width: 750px;
  h2{
    text-align: center;
    font-size: .533rem;
  }
  ul {
    font-size: .45rem;
    margin-top: .267rem;
    li{
      width: 90%;
      padding:.16rem 0;
      background: #fff;
      text-indent: 2em;
      border-radius: .133rem;
      margin:0 auto .3rem;
      div{
        justify-content: space-between;
        .icon{
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
