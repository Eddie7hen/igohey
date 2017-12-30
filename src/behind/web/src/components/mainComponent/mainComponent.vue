<template>
    <div id="main">
        <Ed-header></Ed-header>
        <main class="mainBody" >
            <Ed-nav></Ed-nav>
            <div class="mainContent" >
                <div class="mainToolBar" >
                    <el-button type="success" >成功按钮</el-button>
                </div>
                <router-view class="mainView" ></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import './mainComponent.scss';
    import header from './header/headerComponent.vue';
    import nav from './nav/navComponent.vue';

    export default {
        components:{
            'Ed-header':header,
            'Ed-nav': nav
        }
    }
</script>

