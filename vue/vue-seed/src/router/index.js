import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Meet from '@/components/Meet'
import Weekly from '@/components/Weekly'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/meet',
    name: 'Meet',
    component: Meet
  }, {
    path: '/weekly',
    name: 'Weekly',
    component: Weekly
  }, {
    path: '/project',
    name: 'Project',
    component: Project
  }]
})
