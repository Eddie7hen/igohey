import Vue from 'vue';
import VueRouter from 'vue-router';

import CommonComponent from '../components/commonComponent/commonComponent.vue'

Vue.use(VueRouter)

var router = new VueRouter({
    mode: 'history',
    routes :[
        {
            path: '/common',
            name: 'common',
            component:CommonComponent,
        }
    ] 
})