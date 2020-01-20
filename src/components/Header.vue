<template>
  <div class="header">
    <div v-if="$store.state.home.open" class="logo">酒店考核管理系统</div>
    <div v-else class="logo">Hotel Assessment System</div>
    <div class="nav-item1">
      <span @click="engAction">{{$store.state.home.open ? 'English' : '中文'}}</span>
      <i class="nav-bar"></i>
    </div>
    <div class="nav">
      <div class="nav-item">
        <span v-if="$store.state.home.open">管理员</span>
        <span v-else>admin</span>
        <i class="nav-bar1"></i>
      </div>
      <div class="nav-item">
        <span v-if="$store.state.home.open" @click="btnAction">退出</span>
        <span v-else @click="btnAction">quit</span>
        <i class="nav-bar2"></i>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../ajax/request";
export default {
  methods: {
    btnAction() {
      request.get("/creaAdmin/logout").then(res => {
        console.log(res);
        const { code, message } = res.data;
        if (code == 200) {
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("password");
          sessionStorage.removeItem("value");
          this.$router.push({ name: "login" });
          this.$message({
            type: "info",
            message: "退出成功"
          });
        }
      });
      this.$router.push({ path: "/login" });
    },
    engAction() {
      this.$store.commit("setOpen", !this.$store.state.home.open);
    }
  }
};
</script>

<style lang="scss" scoped>
.header .nav-item1:hover .nav-bar {
  box-sizing: border-box;
  transition: all 0.2s;
  opacity: 1;
  width: 60px;
  height: 5px;
}
.header .nav .nav-item:hover .nav-bar1 {
  box-sizing: border-box;
  transition: all 0.2s;
  opacity: 1;
  width: 100px;
  height: 5px;
}
.header .nav .nav-item:hover .nav-bar2 {
  box-sizing: border-box;
  transition: all 0.2s;
  opacity: 1;
  width: 60px;
  height: 5px;
}
.header .nav .nav-item:hover span {
  color: #fff;
}
.header .nav-item1:hover span {
  color: #fff;
}
.header {
  position: relative;
  z-index: 1000;
  height: 60px;
  background-color: #23262e;
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    width: 200px;
    height: 100%;
    text-align: center;
    line-height: 60px;
    color: #009688;
  }
  .nav-item1 {
    display: inline-block;
    line-height: 60px;
    font-size: 14px;
    position: absolute;
    right: 200px;
    width: 4rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    bottom: 0;
    span {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .nav-bar {
      border-bottom: 5px solid #009688;
      position: absolute;
      left: 4px;
      bottom: 0;
      opacity: 0;
      transition: all 0.2s;
      width: 0;
      height: 5px;
      color: #fff;
      padding: 0 20px;
    }
  }
  .nav {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    padding: 0 20px;
    .nav-item {
      cursor: pointer;
      display: inline-block;
      line-height: 60px;
      font-size: 14px;
      span {
        font-size: 12px;
        display: block;
        padding: 0 20px;
        color: rgba(255, 255, 255, 0.7);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .nav-bar1 {
      border-bottom: 5px solid #009688;
      position: absolute;
      left: 12px;
      bottom: 5px;
      opacity: 0;
      transition: all 0.2s;
      width: 0;
      height: 5px;
    }
    .nav-bar2 {
      border-bottom: 5px solid #009688;
      position: absolute;
      right: 22px;
      bottom: 5px;
      opacity: 0;
      transition: all 0.2s;
      width: 0;
      height: 5px;
    }
  }
}
</style>
