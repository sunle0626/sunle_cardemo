import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Details from '@/components/Details'
import Img from '@/components/Img'
import Color from '@/components/Color'
import Type from '@/components/Type'
import Quotation from '@/components/Quotation'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
          path:'/details',
          name:'Details',
          component:Details
        },
        {
          path:'/img',
          name:'Img',
          component:Img
        },
        {
          path:'/color',
          name:'Color',
          component:Color
        },
        {
          path:'/type',
          name:'Type',
          component:Type
        },
        {
          path:'/quotation',
          name:'Quotation',
          component:Quotation
        }
      ]
      
    }
  ]
})
