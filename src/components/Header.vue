<template>
    <div id="header" class="flex"><i class="iconfont icon flex" @click="backFn">&#xe735;</i> <span>{{title}}</span></div>
</template>

<script>
export default {
    props: ["title"],
  data () {
    return {
    }
  },
  methods:{
      backFn(){
        history.back();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#header{
    height: 1.333rem;
    margin-bottom: .267rem;
    background-color: #eaeaea;
    font-size: .533rem;
    .icon{
        position: absolute;
        left:0;
        width: 1.333rem;
        width: 1.333rem;
    }
}
</style>
