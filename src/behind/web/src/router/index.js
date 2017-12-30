import Vue from 'vue';
import VueRouter from 'vue-router';

import CommonComponent from '../components/commonComponent/commonComponent.vue';
import MainComponent from '../components/mainComponent/mainComponent.vue';
import HeaderComponent from '../components/mainComponent/header/headerComponent.vue';

Vue.use(VueRouter)

var router = new VueRouter({
    mode: 'history',
    routes :[
        {
            path: '/common',
            name: 'common',
            component: CommonComponent,
        },
        {
            path: '/main',
            name: 'main',
            component: MainComponent
        },
        {
            path: '/header',
            name: 'header',
            component: HeaderComponent,
        }
    ] 
})

export default router