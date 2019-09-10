import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '@/components/index'
import CglCounter from '@/components/cglCounter/index'
import CglDiscslider from '@/components/cglDiscslider/index'
import CglCirchildSlide from '@/components/cglCirchildSlide/index'
import CglYslider from '@/components/cglYslider/index'
import CglMovedel from '@/components/cglMovedel/index'
import CglEchartCirmove from '@/components/cglEchartCirmove/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Indexs',
      component: Indexs
    },
    {
      path: '/cglcounter',
      name: 'CglCounter',
      component: CglCounter
    },
    {
      path: '/cglDiscslider',
      name: 'CglDiscslider',
      component: CglDiscslider
    },
    {
      path: '/cglCirchildSlide',
      name: 'CglCirchildSlide',
      component: CglCirchildSlide
    },
    {
      path: '/cglYslider',
      name: 'CglYslider',
      component: CglYslider
    },
    {
      path: '/cglMovedel',
      name: 'CglMovedel',
      component: CglMovedel
    },
    {
      path: '/cglEchartCirmove',
      name: 'CglEchartCirmove',
      component: CglEchartCirmove
    }
  ]
})
