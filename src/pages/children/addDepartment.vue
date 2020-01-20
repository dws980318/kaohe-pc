<template>
  <div class="pages" style="padding:15px;">
    <!-- 部门 -->
    <div class="reuse">
      <div v-if="$store.state.home.open" class="title">新增部门</div>
      <div v-else class="title">add Department</div>
      <div class="form_box">
        <form action>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">名称</span>
            <div class="inp-block">
              <input type="text" class="from-inp" ref="inp1">
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">title</span>
            <div class="inp-block">
              <input type="text" class="from-inp" ref="inp1">
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">考核标准</span>
            <div class="inp-block">
              <div
                class="from-checkbox"
                v-for="(item, index) in list"
                :key="index"
                @click="showAction(index)"
                :class="{active: isArr.indexOf(list[index].id) != -1 }"
              >
                <span class="span">{{item.name}}</span>
                <i></i>
              </div>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">criteria of assessment</span>
            <div class="inp-block">
              <div
                class="from-checkbox"
                v-for="(item, index) in list"
                :key="index"
                @click="showAction(index)"
                :class="{active: isArr.indexOf(list[index].id) != -1 }"
              >
                <span class="span">{{item.englishName}}</span>
                <i></i>
              </div>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">状态</span>
            <div class="inp-block">
              <el-select v-model="values" placeholder="启用" ref="inp3">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="from-inp"
                  ref="inp3"
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
                  ref="inp3"
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
  props: {
    query: [String, Object]
  },
  data() {
    return {
      list: [],
      options: [
        { value: "启用", label: "启用" },
        { value: "禁用", label: "禁用" }
      ],
      option: [
       { value: 'Activate', label: "Activate" },
        { value: 'Terminate', label: "Terminate" }
      ],
      values: "",
      value: "",
      showIndex: -1,
      isArr: [],
      pageSize: 9999,
      currentPage: 1
    };
  },
  methods: {
    showAction(index) {
      let selectIndex = this.isArr.indexOf(this.list[index].id);
      if (selectIndex == -1) {
        this.isArr.push(this.list[index].id);
      } else {
        this.isArr.splice(selectIndex, 1);
      }
      console.log(selectIndex);
    },
    backAction() {
      this.$router.back();
    },
    addAction() {
      let val1 = this.$refs.inp1.value;
      // let val2 = this.$refs.inp2.value;
      let val3 = this.$refs.inp3.value;
      console.log(val3);
      let val6 = "";
      if (val3 == "启用") {
        val6 = 1;
      } else {
        val6 = 0;
      }
      console.log(val6);
      let arr = [];
      for (let i = 0; i < this.isArr.length; i++) {
        if (this.isArr[i] != -1) {
          arr.push(this.isArr[i]);
        }
      }
      let arr1 = arr.join(",");
      console.log(arr1);

      var data = new URLSearchParams();
      data.append("name", val1);
      data.append("englishName", val1); //你要传给后台的参数值 key/value
      data.append("assessId", arr1);
      data.append("status", val6);
      request.post("/creaDepartment/add", data).then(res => {
        console.log(res);
        const { code, message } = res.data;
        if (code == 200) {
          this.$router.go(-1);
          this.$message({
            type: "info",
            message: message
          });
        } else {
          this.$message({
            type: "info",
            message: message
          });
        }
      });
    },
    eachAction() {
      var data = new URLSearchParams();
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("creaAssess/selectCreaAssessList", data).then(res => {
        let newData = res.data.data.records.map(item => {
          return {
            englishName: item.englishName,
            name: item.name,
            status: Boolean(Number(item.status)) ? "启用" : "禁用",
            id: item.id
          };
        });
        this.list = newData;
        console.log(this.list);
      });
    }
  },
  created() {
    this.eachAction();
  }
};
</script>

<style lang="scss" scoped>
.from-checkbox:hover i {
  color: #c2c2c2;
}
.from-checkbox:hover span {
  background-color: #c2c2c2;
}
.reuse {
  .active {
    span {
      background-color: #5fb878;
    }
    i {
      color: #5fb878;
    }
  }
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
          padding-left: 10px;
          height: 38px;
          line-height: 1.3;
          line-height: 38px\9;
          border-width: 1px;
          border-style: solid;
          background-color: #fff;
          border-radius: 2px;
          border-color: #e6e6e6;
          box-sizing: border-box;
        }
        .from-checkbox {
          margin-top: 4px;
          position: relative;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          padding-right: 30px;
          cursor: pointer;
          font-size: 0;
          -webkit-transition: 0.1s linear;
          transition: 0.1s linear;
          box-sizing: border-box;
          display: inline-block;
          background-color: #fff;
          span {
            padding: 0 10px;
            height: 100%;
            font-size: 14px;
            border-radius: 2px 0 0 2px;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            vertical-align: middle;
          }
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
  .span {
    background-color: #d2d2d2;
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 28px;
    border: 1px solid #d2d2d2;
    border-left: none;
    border-radius: 0 2px 2px 0;
    color: #fff;
    font-size: 20px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    &::before {
      content: "\2713";
      width: 10px;
      height: 10px;
      line-height: 10px;
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
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
}
</style>
