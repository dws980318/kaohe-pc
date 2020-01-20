<template>
  <div class="content" style="opactiy:1">
    <div class="login">
      <div class="item">
        <div class="txt">账号</div>
        <input type="text" class="inp" v-model="name">
      </div>
      <div class="item">
        <div class="txt">密码</div>
        <input type="password" class="inp" v-model="password">
      </div>
      <div class="item">
        <button class="btn" @click="loginAction">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../ajax/request";
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    loginAction() {
      console.log(111);
      if (this.name == "") {
        this.$message({
          type: "info",
          message: "账号不能为空"
        });
      } else if (this.password == "") {
        this.$message({
          type: "info",
          message: "密码不能为空"
        });
      } else {
        var data = new URLSearchParams();
        data.append("name", this.name);
        data.append("password", this.password);
        request.post("/creaAdmin/login", data).then(res => {
          console.log(res);
          const { code, message } = res.data;
          if (code == 200) {
            this.$store.commit("SET_user", {
              name: this.name,
              password: this.password
            });
            this.$router.push({
              name: "department"
            });
            this.$message({
              type: "info",
              message: "登录成功"
            });
          } else {
            this.$message({
              type: "info",
              message: "请输入正确的账号密码"
            });
          }
        });
      }

      // this.$router.push({path: '/department'})
      // if (this.name == "") {
      //   alert("管理员号不能为空");
      //   return false;
      // }
      // if (this.password == "") {
      //   alert("密码不能为空");
      //   return false;
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #393d49;
  border: 1px solid transparent;
  .login {
    width: 400px;
    height: auto;
    padding: 20px;
    margin: 180px auto 0;
    border: 1px solid transparent;
    border-radius: 20px;
    background-color: #d2d2d2;
    box-sizing: border-box;
    .item {
      width: 100%;
      height: 36px;
      text-align: center;
      margin-bottom: 15px;
      clear: both;
      border: 0;
      .txt {
        float: left;
        display: block;
        padding: 9px 15px;
        width: 60px;
        font-weight: 400;
        line-height: 20px;
        text-align: right;
      }
      .inp {
        border: 1px solid #fff;
        border-radius: 2px;
        width: 266px;
        height: 36px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .btn {
        width: 120px;
        display: inline-block;
        height: 38px;
        line-height: 38px;
        padding: 0 18px;
        background-color: #009688;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
