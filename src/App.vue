<template>
  <div id="app">
    <!-- 左侧菜单 -->
    <!-- <keep-alive> -->
      <Admin v-show="$route.meta.keepAlive"></Admin>
    <!-- </keep-alive> -->

    <!-- <keep-alive>
      <Header @showAction="showListAction(isShow)" v-if="show==false"></Header>
    </keep-alive>
    <Tabs v-if="show==false"></Tabs>

    <keep-alive>
      <Login v-if="show==true"></Login>
    </keep-alive>-->

    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import Admin from "./pages/home/Admin";
import Login from "./pages/login/root";
// import Tabs from "./components/Tabs";
// import Header from "./components/Header";

export default {
  // 注册组件
  components: {
    // Tabs,
    // Header,
    Login,
    Admin
  }
  // data() {
  //   return {
  //     show: false
  //   };
  // },
  // props: {
  //   isShow: Boolean
  // },
  // methods: {
  //   showListAction(isShow) {
  //     this.show = !isShow;
  //     console.log(this.show);
  //     console.log(isShow);
  //   }
  // }
};
</script>

<style>
</style>


