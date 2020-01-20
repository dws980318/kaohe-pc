<template>
  <div class="pages" style="padding:15px;">
    <!-- 基本服务要素 -->
    <div class="reuse">
      <div v-if="$store.state.home.open" class="title">新增题目</div>
      <div v-else class="title">add Topic</div>
      <div class="form_box">
        <form action>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">内容</span>
            <div class="inp-block">
              <textarea class="from-inp" ref="inp1"/>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">title</span>
            <div class="inp-block">
              <textarea class="from-inp" ref="inp1"/>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">状态</span>
            <div class="inp-block">
              <el-select v-model="value" placeholder="启用" ref="inp3">
                <el-option
                  v-for="item in options"
                  :key="item.values"
                  :label="item.label"
                  :value="item.values"
                  class="from-inp"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">status</span>
            <div class="inp-block">
              <el-select v-model="value" placeholder="Activate" ref="inp3">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="from-inp"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <div class="inp-block" style="text-align: center;margin: 0;">
              <div class="from-btn" @click="addAction">保存</div>
              <div type="reset" class="from-btn from-btn-primary" @click="backAction">返回</div>
            </div>
          </div>
           <div v-else class="from-item">
            <div class="inp-block" style="text-align: center;margin: 0;">
              <div class="from-btn" @click="addAction">save</div>
              <div type="reset" class="from-btn from-btn-primary" @click="backAction">return</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../ajax/request";
export default {
  data() {
    return {
       options: [
        { values: 1, label: "启用" },
        { values: 0, label: "禁用" }
      ],
      option: [
        { value: 1, label: "Activate" },
        { value: 0, label: "Terminate" }
      ],
      value: "",
      values: "",
    };
  },
  methods: {
    backAction() {
      this.$router.back();
    },
    addAction() {
      let val1 = this.$refs.inp1.value;
      let val3 = this.$refs.inp3.value;
      // let val6 = "";
      // if (val3 == "启用") {
      //   val6 = 1;
      // } else {
      //   val6 = 0;
      // }
      var data = new URLSearchParams();
      data.append("question", val1);
      data.append("englishQuestion", val1);
      data.append("status", val3);
      data.append('assessId', this.$route.params.id)
      request.post("/creaAssessIssue/add", data).then(res => {
        console.log(res);
        const { code, message } = res.data;
        if (code == 200) {
          this.$router.go(-1);
           this.$message({
            type: "info",
            message: message
          });
        }else {
          this.$message({
            type: "info",
            message: message
          });
        }
      });
    }
  },
  created() {
    // console.log(this.$route.params)
  }
};
</script>

<style lang="scss" scoped>
.reuse {
  .title {
    text-align: center;
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: 800;
  }
  .form_box {
    width: 820px;
    margin: 0 auto;
    .from-item {
      margin-bottom: 15px;
      .from-span {
        float: left;
        display: block;
        padding: 9px 15px;
        width: 100px;
        font-weight: 400;
        line-height: 20px;
        text-align: right;
        font-size: 12px;
      }
      .inp-block {
        min-height: 36px;
        margin-left: 130px;
        position: relative;
        .from-inp {
          display: block;
          width: 100%;
          padding: 6px 10px;
          min-height: 100px;
          line-height: 1.3;
          line-height: 38px\9;
          border-width: 1px;
          border-style: solid;
          background-color: #fff;
          border-radius: 2px;
          border-color: #e6e6e6;
          box-sizing: border-box;
        }
        .from-btn {
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
          margin-left: 10px;
          outline: 0;
          transition: all 0.3s;
          box-sizing: border-box;
          &:hover {
            opacity: 0.7;
          }
        }
        .from-btn-primary {
          border: 1px solid #c9c9c9;
          background-color: #fff;
          color: #555;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-input__inner {
  display: block;
  padding-left: 10px;
  height: 38px;
  line-height: 1.3;
  line-height: 38px\9;
  border-width: 1px;
  border-style: solid;
  background-color: #fff;
  border-radius: 2px;
  border-color: #e6e6e6;
}
</style>

<style lang="scss">
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
}
</style>