<template>
  <div>
    <Header></Header>
    <!-- 左侧菜单 -->
    <Tabs></Tabs>

    <!-- 匹配到的子组件 -->
    <!-- <div class="sild-body"> 
      <router-view></router-view>
     </div> -->
  </div>
</template>

<script>
import Tabs from "../../components/Tabs";
import Header from "../../components/Header";

export default {
  // 注册组件
  components: {
    Tabs,
    Header
  },
  
};
</script>

<style>
.el-table {
  margin: 10px 0;
}
.el-table th {
  background-color: #cfd8d773;
  border: 1px solid #fff;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.el-table tr {
  background-color: #fff;
}
.el-table th, .el-table tr{
  
}
.el-table--small td {
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.el-btn {
  border: 1px solid #009688;
  background-color: #009688;
}
.sild-body {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 40px;
  z-index: 998;
  width: auto;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
